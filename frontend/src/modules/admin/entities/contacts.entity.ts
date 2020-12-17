import { IsEmail, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class ContactsEntity {
    constructor(payload: ContactsEntity) {
        Object.assign(this, payload);
    }

    @IsEmail({}, { message: 'Здесь должна быть почта' })
    email!: string;

    @IsPhoneNumber('ru', { message: 'Здесь должен быть указан номер телефона' })
    phone!: string;

    @MinLength(5, { message: 'Необходимо указать должность' })
    @MaxLength(20)
    position!: string;
}
