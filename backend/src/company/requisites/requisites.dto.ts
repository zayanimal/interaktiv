import { IsNotEmpty, IsArray, IsUUID, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
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

    @IsArray()
    @ValidateNested()
    @Type(() => BankDto)
    bank!: BankDto[];
}
