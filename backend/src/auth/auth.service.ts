import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    validateUser(username: string, pass: string): any {
        const user = this.usersService.findOne(username);

        if (user && user.password === pass) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    login(user: any) {
        return {
            access_token: this.jwtService.sign({
                username: user.username,
                sub: user.userId
            })
        };
    }
}
