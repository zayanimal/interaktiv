import { Observable } from 'rxjs';
import {
    Controller,
    Request,
    Post,
    UseGuards,
    Body,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { UserDto } from '@users/dto/user.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    public register(@Body() createUserDto: CreateUserDto ): Observable<UserDto> {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    public login(@Body() loginUserDto: LoginUserDto): Observable<LoginStatus> {
        console.log(loginUserDto);
        return this.authService.login(loginUserDto);
    }
}
