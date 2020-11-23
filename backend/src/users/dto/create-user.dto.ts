import { IsNotEmpty } from 'class-validator';
import { Contacts } from '@contacts/entities/contacts.entity';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    permissions: string[];

    @IsNotEmpty()
    contacts: Contacts;
}
