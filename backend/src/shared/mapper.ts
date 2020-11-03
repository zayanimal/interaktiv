import { Users } from '@users/entities/users.entity';
import { UserDto } from '@users/dto/user.dto';

export const toUserDto = (data: Users): UserDto => {
    return {
        id: data.id,
        username: data.username
    };
};
