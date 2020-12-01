import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class BankDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    rs!: string;

    @IsNotEmpty()
    ks!: string;

    @IsNotEmpty()
    bik!: string;

    @IsNotEmpty()
    address!: string;
}
