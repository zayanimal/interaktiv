import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './users.entity';
import { toUserDto } from '@shared/mapper';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async findUserCheckPass({ username, password }: LoginUserDto) {
        const user = await this.usersRepository.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED);
        }

        if (!await bcrypt.compare(user.password, password)) {
            throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByUsername({ username }: any): Promise<UserDto> {
        return toUserDto(await this.usersRepository.findOne({ where: { username } }));
    }

    async checkExistsAndCreate(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password } = userDto;

        const found = await this.usersRepository.findOne({ where: { username } })

        if (found) {
            throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST);
        }

        const user = this.usersRepository.create({ username, password });

        await this.usersRepository.save(user);

        return toUserDto(user);
    }
}
