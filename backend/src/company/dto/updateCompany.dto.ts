import { IsNotEmpty, IsObject, IsArray, IsUUID, IsOptional } from 'class-validator';
import { ContactDto } from '@company/dto/contact.dto';
import { RequisitesDto } from '@company/requisites/requisites.dto';

export class UpdateCompanyDto {
    @IsUUID()
    id!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    users!: string[];

    @IsObject()
    contact!: ContactDto;

    @IsArray()
    requisites!: RequisitesDto[];
}
