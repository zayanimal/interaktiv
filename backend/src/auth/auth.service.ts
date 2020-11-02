import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import { UserDto } from '@users/dto/user.dto';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        try {
            await this.usersService.create(userDto);

            return {
                success: true,
                message: 'user registered',
            };
        } catch (err) {
            return {
                success: false,
                message: err
            };
        }
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        try {
            const { id, username } = await this.usersService.findByLogin(loginUserDto);

            return {
                username,
                accessToken: this.jwtService.sign({ id, username })
            };
        } catch({ status, message }) {
            return { status, message };
        }
    }

    private createToken({ username }: UserDto): any {
        const user = { username };

        return this.jwtService.sign(user);
    }
}
