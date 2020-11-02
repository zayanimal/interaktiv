import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';
import { toUserDto } from '@shared/mapper';
import { comparePasswords } from '@shared/utils';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findOne(options?: object): Promise<UserDto> {
        return toUserDto(await this.usersRepository.findOne(options));
    }

    async findAll(): Promise<UserDto[]> {
        return await this.usersRepository.find({ select: ['id', 'username', 'email'] });
    }

    /** проверить логин и пароль, в случае успешной проверки вернуть пользователя */
    async findByLogin({ username, password }: LoginUserDto) {
        const user = await this.usersRepository.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        if (!await comparePasswords(user.password, password)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    /** найти пользователя по payload */
    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({ where: { username } });
    }

    /** создать пользователя */
    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = userDto;

        if (await this.usersRepository.findOne({ where: { username } })) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user = this.usersRepository.create({ username, password, email });

        await this.usersRepository.save(user);

        return toUserDto(user);
    }
}
