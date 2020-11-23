import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { switchMap, switchAll, map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ContactsService } from '@contacts/contacts.service';
import { UserDto } from '@users/dto/user.dto';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { Users } from '@users/entities/users.entity';
import { Roles } from '@auth/entities/roles.entity';
import { Permissions } from '@auth/entities/permissions.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>,
        @InjectRepository(Permissions)
        private readonly permissionsRepository: Repository<Permissions>,
        private contactsService: ContactsService
    ) {}

    dbRequest(username: string) {
        return {
            where: { username },
            relations: ['roles', 'permissions']
        };
    }

    /**
     * Пагинация юзеров общий список
     * @param page
     * @param limit
     */
    getUsers(page: number, limit: number): Observable<
        Omit<Pagination<Omit<UserDto, 'permissions'>>, 'links'>
    > {
        return from(
            paginate(this.usersRepository
                .createQueryBuilder('users')
                .orderBy('users.time', 'ASC')
                .leftJoinAndSelect('users.roles', 'roles'),
                { page, limit }
            )
        ).pipe(
            mergeMap(({ items, meta }) => forkJoin({
                    items: from(items.map((user) => ({
                        username: user.username,
                        role: user.roles.name,
                        time: user.time,
                        isActive: user.isActive
                    }))).pipe(toArray()),
                    meta: of(meta)
                })
            ),

            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }

    /**
     * Найти пользователя в базе по имени
     * @param param имя пользователя
     */
    findByUsername(username: string): Observable<UserDto> {
        return from(this.usersRepository.findOne(this.dbRequest(username))).pipe(
            switchMap((user) => (user
                ? of(user).pipe(
                    map((user) => ({
                        username: user.username,
                        role: user.roles.name,
                        isActive: user.isActive,
                        permissions: user.permissions.map(
                            (perm: { name: string }) => perm?.name
                        )
                    }))
                )
                : throwError(
                    new HttpException('Пользователь не существует', HttpStatus.UNAUTHORIZED)
                ))
            )
        );
    }

    /**
     * Проверить существует ли пользователь в базе, если нет создать нового
     * @param userDto логин и пароль пользователя
     */
    checkExistsAndCreate(userDto: CreateUserDto): Observable<{ message: string; }> {
        const {
            username,
            password,
            role,
            permissions,
            contacts
        } = userDto;

        return from(this.usersRepository.findOne(this.dbRequest(username))).pipe(
            switchMap(async (user) => {
                if (!user) {
                    /** Поиск и проверка роли */
                    const roleId = (await this.rolesRepository.findOne({ where: { name: role } }))?.id;

                    if (!roleId) {
                        return throwError(
                            new HttpException('Введена неверная роль', HttpStatus.BAD_REQUEST)
                        );
                    }

                    /** Поиск и проверка прав */
                    const foundPerm = await this.permissionsRepository
                        .createQueryBuilder('permissions')
                        .where('permissions.name IN (:...name)', { name: permissions })
                        .getMany();

                    if (!foundPerm.length || (foundPerm.length !== permissions.length)) {
                        return throwError(
                            new HttpException('Введены неверные права', HttpStatus.BAD_REQUEST)
                        );
                    }

                    /** Создание нового пользователя */
                    const newUser = this.usersRepository.create({ username, password });
                          newUser.rolesId = roleId;
                          newUser.permissions = foundPerm;

                    const { id } = await this.usersRepository.save(newUser);

                    /** Создание контактов нового пользователя */
                    await this.contactsService.create({ ...contacts, usersId: id });

                    return of({ message: `Пользователь ${username} добавлен` });
                } else {
                    return throwError(
                        new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST)
                    );
                }
            }),

            switchAll()
        );
    }

    /**
     * Удалить пользователя
     * @param userName
     */
    removeUser(username: string) {
        return from(this.usersRepository.findOne({ where: { username } })).pipe(
            switchMap((user) => from(this.usersRepository.remove(user)).pipe(
                map(() => ({ message: `Пользователь ${username} удалён` }))
            )),

            catchError(() => throwError(
                new HttpException(
                    `Пользователь ${username} не найден`,
                    HttpStatus.BAD_REQUEST
                )
            ))
        );
    }
}
