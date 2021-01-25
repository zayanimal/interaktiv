import { IsNotEmpty } from 'class-validator';
import { CompanyContactEntity, RequisitesEntity } from '@admin/entities';

export class CompanyEntity {
    id?: string;

    @IsNotEmpty({ message: 'Поле не должно быть пустым', })
    name!: string;

    users!: string[];

    contact!: CompanyContactEntity;

    requisites!: RequisitesEntity[];
}
