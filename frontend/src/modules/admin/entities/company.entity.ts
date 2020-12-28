import {
    CompanyContactEntity,
    RequisitesEntity,
} from '@admin/entities';

export class CompanyEntity {
    id!: string;

    name!: string;

    users!: string[];

    contact!: CompanyContactEntity;

    requisites!: RequisitesEntity[];
}
