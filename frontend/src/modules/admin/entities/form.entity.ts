import { MinLength, MaxLength, IsOptional, ValidateNested } from 'class-validator';
import { Transform } from 'class-transformer';
import { ContactsEntity } from '@admin/entities';

export class UserFormEntity {
    constructor(payload: UserFormEntity) {
        Object.assign(this, payload);
    }

    @MinLength(4, { message: 'Не меньше 4-х символов'})
    @MaxLength(10, { message: 'Не больше 10 символов'})
    username!: string;

    @IsOptional()
    @MinLength(7, { message: 'Не меньше 7-ми символов'})
    @MaxLength(16, { message: 'Не меньше 16-ти символов'})
    @Transform((pass) => pass || null)
    password!: string;

    role!: string;

    permissions!: string[];

    @ValidateNested()
    contacts!: ContactsEntity;
}
