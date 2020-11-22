import { IsNotEmpty, IsObject } from 'class-validator';
import { Contacts } from '@users/entities/contacts.entity';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    permissions: string[];

    @IsObject()
    contacts?: Contacts;
}
