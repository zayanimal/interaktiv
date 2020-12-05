import { IsNotEmpty, IsUUID, IsString, IsNumber, IsOptional } from 'class-validator';

export class GoodDto {
    @IsNotEmpty()
    @IsUUID()
    id!: string;

    @IsOptional()
    @IsNumber()
    cost?: number;

    @IsOptional()
    @IsString()
    margin?: number;

    @IsOptional()
    @IsString()
    discount?: number;
}
