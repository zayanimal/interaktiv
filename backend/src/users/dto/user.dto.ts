import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    permissions: string[];
}
