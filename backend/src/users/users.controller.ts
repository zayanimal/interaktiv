import { Observable } from 'rxjs';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Query,
    Post,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Roles } from '@auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    findOne(@Query() params: { username: string }): Observable<UserDto | UserDto[]> {
        if (params?.username) {
            return this.usersService.findByUsername(params.username);
        }
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    removeUser(@Query() params: { username: string }) {
        return this.usersService.removeUser(params.username);
    }
}
