import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entities/users.entity';
import { toUserDto } from '@shared/mapper';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    /**
     * Проверить есть ли пользователь в базе и соответствует ли его пароль
     * @param param введеные пользователем логин и пароль
     */
    async findUserCheckPass({ username, password }: LoginUserDto) {
        const user = await this.usersRepository.findOne({
            where: { username },
            relations: ['roles']
        });

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED);
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    /**
     * Найти пользователя в базе по имени
     * @param param имя пользователя
     */
    async findByUsername({ username }: { username: string }): Promise<UserDto> {
        return toUserDto(await this.usersRepository.findOne({ where: { username } }));
    }

    /**
     * Проверить существует ли пользователь в базе, если нет создать нового
     * @param userDto логин и пароль пользователя
     */
    async checkExistsAndCreate(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password } = userDto;

        if (await this.usersRepository.findOne({ where: { username } })) {
            throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST);
        }

        const user = this.usersRepository.create({ username, password });

        await this.usersRepository.save(user);

        return toUserDto(user);
    }
}
