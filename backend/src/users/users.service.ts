import { Observable, of, from, throwError } from 'rxjs';
import { switchMap, switchAll, map } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    /**
     * Проверить есть ли пользователь в базе и соответствует ли его пароль
     * @param param введеные пользователем логин и пароль
     */
    findUserCheckPass({ username, password }: LoginUserDto): Observable<any> {
        return from(this.usersRepository.findOne({
            where: { username },
            relations: ['roles']
        })).pipe(
            switchMap((user) => (user
                ? of(user).pipe(
                    switchMap(async (user) => (await compare(password, user.password)
                        ? of(user)
                        : throwError(new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED)))
                    )
                )
                : throwError(new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED)))
            ),

            switchAll()
        );
    }

    /**
     * Найти пользователя в базе по имени
     * @param param имя пользователя
     */
    findByUsername({ username }: { username: string }): Observable<UserDto> {
        return from(this.usersRepository.findOne({
            where: { username },
            relations: ['roles']
        })).pipe(
            switchMap((user) => (user
                ? of(user).pipe(
                    map(({ id, username, roles }) => ({ id, username, role: roles.name }))
                )
                : throwError(new HttpException('Пользователь не существует', HttpStatus.UNAUTHORIZED)))
            )
        );
    }

    /**
     * Проверить существует ли пользователь в базе, если нет создать нового
     * @param userDto логин и пароль пользователя
     */
    checkExistsAndCreate(userDto: CreateUserDto): Observable<UserDto> {
        const { username, password, permissions } = userDto;

        return from(this.usersRepository.findOne({
            where: { username },
            relations: ['roles', 'permissions']
        })).pipe(
            switchMap(async (user) => {
                if (!user) {
                    const newUser = this.usersRepository.create({ username, password });
                    console.log('first', newUser);

                    newUser.permissions = permissions.map((permission) => ({ name: permission }));

                    await this.usersRepository.save(newUser);

                    console.log('second', newUser);

                    return of(newUser).pipe(
                        map(({ id, username, roles, permissions }) => ({
                            id,
                            username,
                            role: roles.name,
                            permissions: permissions.map((perm) => perm?.name)
                        }))
                    );
                } else {
                    return throwError(new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST));
                }
            }),

            switchAll()
        );
    }
}
