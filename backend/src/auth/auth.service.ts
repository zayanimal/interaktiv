import { Observable, of, from, throwError, forkJoin } from 'rxjs';
import { toArray, map, mergeMap } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/services/users.service';
import { ContactsService } from '@users/services/contacts.service';
import { UserDto } from '@users/dto/user.dto';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { LoginStatus } from '@auth/interfaces/login-status.interface';
import { JwtPayload } from '@auth/interfaces/payload.interface';
import { Users } from '@users/entities/users.entity';
import { Roles } from '@auth/entities/roles.entity';
import { Permissions } from '@auth/entities/permissions.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>,
        @InjectRepository(Permissions)
        private readonly permissionsRepository: Repository<Permissions>,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        private contactsService: ContactsService,
        private jwtService: JwtService
    ) {}

    /**
     * Проверка пользователя для аутентификации
     * @param payload
     */
    validateUser(payload: JwtPayload): Observable<UserDto> {
        return this.usersService.findByUsername(payload.username);
    }

    /**
     * Проверка существования пользователя
     * @param username
     */
    checkUser(username: string) {
        return from(this.usersRepository.findOne({ where: { username }})).pipe(
                mergeMap((user) => (user
                    ? throwError(
                        new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST)
                    ) : of(user))
                )
            );
    }

    /**
     * Проверка на отсутствие пользователя
     * @param user
     */
    checkUserExistance(user: Users | undefined) {
        return (user
            ? of(user)
            : throwError(new HttpException('Пользователь не существует', HttpStatus.BAD_REQUEST))
        );
    }

    /**
     * Проверка существования введеной роли в словаре ролей
     * @param role
     */
    checkRole(role: string) {
        return from(this.rolesRepository.findOne({ where: { name: role } })).pipe(
            mergeMap((role) => (role
                ? of(role)
                : throwError(
                    new HttpException('Введена неверная роль', HttpStatus.BAD_REQUEST)
                )
            ))
        );
    }

    /**
     * Проверка существования введеных прав в словаре прав
     * @param permissions
     */
    checkPermissions(permissions: string[]) {
        return from(this.permissionsRepository
            .createQueryBuilder('permissions')
            .where('permissions.name IN (:...name)', { name: permissions })
            .getMany()).pipe(
                mergeMap((foundPerm) => {
                    if (!foundPerm.length || (foundPerm.length !== permissions.length)) {
                        return throwError(
                            new HttpException('Введены неверные права', HttpStatus.BAD_REQUEST)
                        );
                    }

                    return from(foundPerm).pipe(toArray());
                })
            );
    }

    /**
     * Проверить существует ли пользователь в базе, если нет создать нового
     * @param userDto логин и пароль пользователя
     */
    register(userDto: CreateUserDto): Observable<{ message: string; }> {
        const { username, password, role, permissions, contacts } = userDto;

        return this.checkUser(username).pipe(
            mergeMap(() => forkJoin({
                roleId: this.checkRole(role).pipe(map(({ id }) => id)),
                permissions: this.checkPermissions(permissions)
            })),
            mergeMap(({ roleId, permissions }) => of(
                this.usersRepository.create({ username, password })
            ).pipe(
                map((newUser) => {
                    newUser.rolesId = roleId;
                    newUser.permissions = permissions;

                    return newUser;
                })
            )),
            mergeMap((readyUser) => from(this.usersRepository.save(readyUser))),
            mergeMap((savedUser) => from(this.contactsService.create(
                { ...contacts, usersId: savedUser.id }
            ))),
            mergeMap((savedContact) => from(this.usersRepository.update(
                { username },
                { contactId: savedContact.id }
            ))),
            map(() => ({ message: `Пользователь ${username} добавлен` }))
        )
    }

    /**
     * Проверить есть ли пользователь в базе и соответствует ли его пароль
     * @param param введеные пользователем логин и пароль
     */
    login({ username, password }: LoginUserDto): Observable<LoginStatus> {
        return from(this.usersRepository.findOne(this.usersService.dbRequest(username))).pipe(
            mergeMap((user) => (user
                ? from(compare(password, user.password)).pipe(
                    mergeMap((state) => (state
                        ? of(user)
                        : throwError(new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED))
                    ))
                )
                : throwError(new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED))
            )),
            map((user) => ({
                username: user.username,
                accessToken: this.jwtService.sign({
                    id: user.id,
                    username: user.username
                }),
                role: user.roles.name,
                isActive: user.isActive,
                permissions: user.permissions.map(({ name }) => name)
            }))
        );
    }
}
