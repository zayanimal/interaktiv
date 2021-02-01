import { IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { ValidationEntity } from '@system/entities';
export class CompanyContactEntity extends ValidationEntity {
    @IsEmail({}, { message: 'Здесь должна быть почта' })
    email!: string;

    @IsPhoneNumber('ru-RU', { message: 'Здесь должен быть указан номер телефона' })
    phone!: string;

    @IsOptional()
    website = '';
}
