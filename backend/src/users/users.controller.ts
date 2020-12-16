import {
    Controller,
    Delete,
    Get,
    Put,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
    Body
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { UsersService } from '@users/services/users.service';
import { Roles } from '@auth/decorators/roles.decorator';
import { CreateUserDto } from '@users/dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Поиск юзера
     * Пример запроса: /users/username
     * @param username имя
     */
    @Get(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    findOne(@Param('username') username: string) {
        return this.usersService.findUserForEdit(username);
    }

    /**
     * Вывод всех юзеров
     * Пример запроса: /users?page=1&limit=10
     * @param page страница
     * @param limit лимит на странице
     */
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    getUsers(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.usersService.getUsers(page, limit);
    }

    @Put('edit/:username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    editUser(
        @Param('username') username: string,
        @Body() editUser: CreateUserDto & { isActive: boolean; }
    ) {
        return this.usersService.editUser(username, editUser);
    }

    /**
     * Удаление юзера
     * Пример запроса: /users/username
     * @param username имя
     */
    @Delete(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    removeUser(@Param('username') username: string) {
        return this.usersService.removeUser(username);
    }
}
