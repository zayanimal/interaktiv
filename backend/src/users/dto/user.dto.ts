import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;
}
