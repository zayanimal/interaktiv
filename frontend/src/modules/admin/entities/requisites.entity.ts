import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ValidationEntity } from '@system/entities';
import { BankRequisitesEntity } from '@admin/entities';

export class RequisitesEntity extends ValidationEntity {
    constructor(id?: string) {
        super();

        if (id) {
            this.id = id;
        }
    }

    @IsNotEmpty({ message: 'Укажите название реквизитов' })
    name = '';

    @IsNotEmpty({ message: 'Заполните ИНН' })
    inn = '';

    @IsNotEmpty({ message: 'Заполните КПП' })
    kpp = '';

    @IsNotEmpty({ message: 'Заполните ОГРН' })
    ogrn = '';

    @ValidateNested()
    @Type(() => BankRequisitesEntity)
    bank: BankRequisitesEntity[] = [];
}
