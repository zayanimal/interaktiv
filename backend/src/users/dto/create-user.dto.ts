import { IsNotEmpty } from 'class-validator';
import { ContactUser } from '@/users/entities/contact-user.entity';

export class CreateUserDto {
    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    role!: string;

    @IsNotEmpty()
    permissions!: string[];

    @IsNotEmpty()
    contacts!: ContactUser;
}
