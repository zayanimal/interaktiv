import { BankRequisitesEntity } from '@admin/entities';

export class RequisitesEntity {
    id!: string;

    name!: string;

    inn!: string;

    kpp!: string;

    ogrn!: string;

    bank!: BankRequisitesEntity[];
}
