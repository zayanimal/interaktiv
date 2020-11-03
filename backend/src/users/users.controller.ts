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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // @UseGuards(JwtAuthGuard)
    // @Post()
    // create(@Body() createUserDto: CreateUserDto): Promise<User> {
    //     return this.usersService.create(createUserDto);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // findOne(@Query() params: { username: string }): Promise<UserDto | UserDto[]> {
    //     if (params?.username) {
    //         return this.usersService.findOne({ where: { username: params.username }});
    //     }

    //     return this.usersService.findAll();
    // }

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
