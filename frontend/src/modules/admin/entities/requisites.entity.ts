import { BankRequisitesEntity } from '@admin/entities';

export class RequisitesEntity {
    constructor(id?: string) { if (id) { this.id = id; } }

    id = '';

    name = '';

    inn = '';

    kpp = '';

    ogrn = '';

    bank: BankRequisitesEntity[] = [];
}
