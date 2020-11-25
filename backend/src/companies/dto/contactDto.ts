import { IsNotEmpty } from 'class-validator';

export class ContactDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    website: string;
}
