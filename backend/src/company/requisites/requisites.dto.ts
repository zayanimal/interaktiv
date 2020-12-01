import { IsNotEmpty, IsArray, IsUUID, IsOptional } from 'class-validator';
import { BankDto } from '@company/bank/bank.dto';

export class RequisitesDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    inn!: string;

    @IsNotEmpty()
    kpp!: string;

    @IsNotEmpty()
    ogrn!: string;

    @IsOptional()
    @IsArray()
    bank!: BankDto[];
}
