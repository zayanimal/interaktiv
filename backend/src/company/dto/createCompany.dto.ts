import { IsNotEmpty, IsObject, IsArray, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ContactDto } from '@company/dto/contact.dto';
import { RequisitesDto } from '@company/requisites/requisites.dto';

export class CreateCompanyDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    users!: string[];

    @IsObject()
    contact!: ContactDto;

    @IsArray()
    @ValidateNested()
    @Type(() => RequisitesDto)
    requisites!: RequisitesDto[];
}
