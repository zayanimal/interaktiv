import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
        private appService: AppService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('hello')
    getHello(): string {
        return this.appService.getHello();
    }
}
