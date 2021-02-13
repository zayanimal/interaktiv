import { IsEmail, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class ContactsEntity {
    @IsEmail({}, { message: 'Здесь должна быть почта' })
    email!: string;

    @IsPhoneNumber('ru-RU', {
        message: 'Здесь должен быть указан номер телефона'
    })
    phone!: string;

    @MinLength(5, { message: 'Не меньше 5-ти символов' })
    @MaxLength(20, { message: 'Не больше 20-ти символов' })
    position!: string;
}
