import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import { UserDto } from '@users/dto/user.dto';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    register(userDto: CreateUserDto) {
        return this.usersService.checkExistsAndCreate(userDto);
    }

    validateUser(payload: JwtPayload): Observable<UserDto> {
        return this.usersService.findByUsername(payload.username);
    }

    login(loginUserDto: LoginUserDto): Observable<LoginStatus> {
        return this.usersService.findUserCheckPass(loginUserDto).pipe(
            map((user) => ({
                username: user.username,
                accessToken: this.jwtService.sign({
                    id: user.id,
                    username: user.username
                }),
                role: user.roles.name,
                status: user.status,
                permissions: user.permissions.map((perm: { name: string }) => perm.name)
            }))
        );
    }
}
