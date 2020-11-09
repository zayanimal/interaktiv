import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    permissions: string[];
}
