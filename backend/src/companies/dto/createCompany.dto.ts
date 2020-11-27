import { IsNotEmpty, IsObject, IsArray, IsUUID, IsOptional } from 'class-validator';
import { ContactDto } from '@companies/dto/contact.dto';
import { RequisitesDto } from '@companies/requisites/requisites.dto';

export class CreateCompanyDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    users: string[];

    @IsObject()
    contact: ContactDto;

    @IsArray()
    requisites: RequisitesDto[];
}
