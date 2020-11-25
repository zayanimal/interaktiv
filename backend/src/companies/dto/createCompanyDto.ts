import { IsNotEmpty, IsObject, IsArray } from 'class-validator';
import { ContactDto } from '@companies/dto/contactDto';
import { RequisitesDto } from '@companies/dto/requisitesDto';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    users: string[];

    @IsObject()
    contact: ContactDto;

    @IsArray()
    requisites: RequisitesDto[];
}
