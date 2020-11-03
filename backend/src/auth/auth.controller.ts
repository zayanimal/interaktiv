import { Controller, Request, Post, UseGuards, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto ): Promise<RegistrationStatus> {
        const result = await this.authService.register(createUserDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }
}
