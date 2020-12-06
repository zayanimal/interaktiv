import { IsNotEmpty, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class GoodDto {
    @IsNotEmpty()
    @IsUUID()
    id!: string;

    @IsOptional()
    @IsNumber()
    cost?: number;

    @IsOptional()
    @IsNumber()
    margin?: number;

    @IsOptional()
    @IsNumber()
    discount?: number;

    @IsOptional()
    @IsNumber()
    quantity?: number;
}
