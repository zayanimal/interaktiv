import { Observable, of, from, throwError } from 'rxjs';
import { switchMap, switchAll, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import { UserDto } from '@users/dto/user.dto';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { LoginStatus } from '@auth/interfaces/login-status.interface';
import { JwtPayload } from '@auth/interfaces/payload.interface';
import { Users } from '@users/entities/users.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    register(userDto: CreateUserDto) {
        return this.usersService.checkExistsAndCreate(userDto);
    }

    validateUser(payload: JwtPayload): Observable<UserDto> {
        return this.usersService.findByUsername(payload.username);
    }

    /**
     * Проверить есть ли пользователь в базе и соответствует ли его пароль
     * @param param введеные пользователем логин и пароль
     */
    login({ username, password }: LoginUserDto): Observable<LoginStatus> {
        return from(this.usersRepository.findOne(this.usersService.dbRequest(username))).pipe(
            mergeMap((user) => (user
                ? of(user).pipe(
                    switchMap(async (user) => (await compare(password, user.password)
                        ? of(user)
                        : throwError(new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED)))
                    )
                )
                : throwError(new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED)))
            ),

            switchAll(),

            map((user) => ({
                username: user.username,
                accessToken: this.jwtService.sign({
                    id: user.id,
                    username: user.username
                }),
                role: user.roles.name,
                isActive: user.isActive,
                permissions: user.permissions.map((perm: { name: string }) => perm.name)
            })),

            catchError((err) => throwError(
                new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            ))
        );
    }
}
