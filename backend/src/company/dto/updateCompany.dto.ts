import {
    IsNotEmpty,
    IsObject,
    IsArray,
    IsUUID,
    ValidateNested,
    ArrayNotEmpty
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContactDto } from '@company/dto/contact.dto';
import { RequisitesDto } from '@company/requisites/requisites.dto';

export class UpdateCompanyDto {
    @IsUUID()
    id!: string;

    @IsNotEmpty()
    name!: string;

    @ArrayNotEmpty()
    users!: string[];

    @IsObject()
    contact!: ContactDto;

    @IsArray()
    @ValidateNested()
    @Type(() => RequisitesDto)
    requisites!: RequisitesDto[];
}
