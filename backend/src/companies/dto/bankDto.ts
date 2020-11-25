import { IsNotEmpty } from 'class-validator';

export class BankDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    rs: string;

    @IsNotEmpty()
    ks: string;

    @IsNotEmpty()
    bik: string;

    @IsNotEmpty()
    address: string;
}
