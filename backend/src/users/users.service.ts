import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { switchMap, switchAll, map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entities/users.entity';
import { Roles } from './entities/roles.entity';
import { Permissions } from './entities/permissions.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>,
        @InjectRepository(Permissions)
        private readonly permissionsRepository: Repository<Permissions>
    ) {}

    private dbRequest(username: string) {
        return {
            where: { username },
            relations: ['roles', 'permissions']
        };
    }

    /**
     * Проверить есть ли пользователь в базе и соответствует ли его пароль
     * @param param введеные пользователем логин и пароль
     */
    findUserCheckPass({ username, password }: LoginUserDto): Observable<any> {
        return from(this.usersRepository.findOne(this.dbRequest(username))).pipe(
            switchMap((user) => (user
                ? of(user).pipe(
                    switchMap(async (user) => (await compare(password, user.password)
                        ? of(user)
                        : throwError(new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED)))
                    )
                )
                : throwError(new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED)))
            ),

            switchAll(),

            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
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
                        status: user.status
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
                        status: user.status,
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
    checkExistsAndCreate(userDto: CreateUserDto): Observable<UserDto> {
        const {
            username,
            password,
            role,
            permissions
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

                    await this.usersRepository.save(newUser);

                    return this.findByUsername(username);
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
        return from(this.usersRepository.findOne(this.dbRequest(username))).pipe(
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
