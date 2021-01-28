import { IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
export class CompanyContactEntity {
    @IsEmail({}, { message: 'Здесь должна быть почта' })
    email!: string;

    @IsPhoneNumber('ru-RU', { message: 'Здесь должен быть указан номер телефона' })
    phone!: string;

    @IsOptional()
    website = '';
}
