import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import { User } from '@users/user.entity'
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
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);

        return {
            username: user.username,
            ...token
        };
    }

    private _createToken({ username }: UserDto): any {
        const user = { username };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: '60m',
            accessToken
        };
    }

    // async validateUser(username: string, pass: string): Promise<Partial<User>> {
    //     const [user] = await this.usersService.findName(username);

    //     if (user && user.password === pass) {
    //         const { password, ...result } = user;

    //         return result;
    //     }

    //     return null;
    // }

    // login(user: any) {
    //     return {
    //         access_token: this.jwtService.sign({
    //             username: user.username,
    //             sub: user.id
    //         })
    //     };
    // }
}
