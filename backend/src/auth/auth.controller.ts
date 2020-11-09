import { Observable } from 'rxjs';
import {
    Controller,
    Req,
    Get,
    Post,
    UseGuards,
    Body,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { UserDto } from '@users/dto/user.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('admin')
    public register(@Body() createUserDto: CreateUserDto ): Observable<UserDto> {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    public login(@Body() loginUserDto: LoginUserDto): Observable<LoginStatus> {
        return this.authService.login(loginUserDto);
    }

    @Get('current')
    @UseGuards(JwtAuthGuard)
    public current(@Req() req: Request) {
        return req.user;
    }
}
