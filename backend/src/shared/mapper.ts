import { User } from '@users/user.entity';
import { UserDto } from '@users/dto/user.dto';

export const toUserDto = (data: User): UserDto => {
    const { id, username, email } = data;
    const userDto: UserDto = { id, username, email };

    return userDto;
};
