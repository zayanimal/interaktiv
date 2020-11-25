import { IsNotEmpty, IsArray } from 'class-validator';
import { BankDto } from '@companies/dto/bankDto';

export class RequisitesDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    inn: string;

    @IsNotEmpty()
    kpp: string;

    @IsNotEmpty()
    ogrn: string;

    @IsArray()
    bank: BankDto[];
}
