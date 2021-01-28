import { IsNotEmpty, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CompanyContactEntity, RequisitesEntity } from '@admin/entities';

export class CompanyEntity {
    id?: string;

    @IsNotEmpty({ message: 'Поле не должно быть пустым', })
    name!: string;

    @ArrayNotEmpty({ message: 'Введите в поисковой строке имя пользователя и выберите его', })
    users!: string[];

    @ValidateNested()
    contact!: CompanyContactEntity;

    @ValidateNested()
    requisites!: RequisitesEntity[];
}
