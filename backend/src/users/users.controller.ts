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
    // @UseGuards(JwtAuthGuard)
    // @Post()
    // create(@Body() createUserDto: CreateUserDto): Promise<User> {
    //     return this.usersService.create(createUserDto);
    // }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    findOne(@Query() params: { username: string }): Observable<UserDto | UserDto[]> {
        if (params?.username) {
            return this.usersService.findByUsername(params);
        }
    }

    // @UseGuards(JwtAuthGuard)
    // @Get(':id')
    // findOne(@Param('id') id: string): Promise<User> {
    //     return this.usersService.findOne(id);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Delete(':id')
    // remove(@Param('id') id: string): Promise<void> {
    //     return this.usersService.remove(id);
    // }
}
