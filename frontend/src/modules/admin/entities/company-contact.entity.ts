import { IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ValidationEntity } from '@shared/entities';

export class CompanyContactEntity extends ValidationEntity {
    /** TODO: убрать как будет исправлен бэк */
    @Exclude()
    id = '';

    @IsEmail({}, { message: 'Здесь должна быть почта' })
    email!: string;

    @IsPhoneNumber('ru-RU', {
        message: 'Здесь должен быть указан номер телефона'
    })
    phone!: string;

    @IsOptional()
    website = '';
}
