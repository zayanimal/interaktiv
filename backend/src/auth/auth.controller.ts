import { Observable } from 'rxjs';
import {
    Controller,
    Req,
    Get,
    Put,
    Post,
    UseGuards,
    Body
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Put('register')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto): Observable<LoginStatus> {
        return this.authService.login(loginUserDto);
    }

    @Get('current')
    @UseGuards(JwtAuthGuard)
    current(@Req() req: Request) {
        return req.user;
    }
}
