import { IsNotEmpty } from 'class-validator';
import { BankRequisitesEntity } from '@admin/entities';

export class RequisitesEntity {
    constructor(id?: string) { if (id) { this.id = id; } }

    id = '';

    @IsNotEmpty({ message: 'Укажите название реквизитов'})
    name = '';

    @IsNotEmpty({ message: 'Заполните ИНН'})
    inn = '';

    kpp = '';

    ogrn = '';

    bank: BankRequisitesEntity[] = [];
}
