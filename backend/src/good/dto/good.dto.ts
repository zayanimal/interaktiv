import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';

export class GoodDto {
    @IsNotEmpty()
    @IsUUID()
    id!: string;

    @IsOptional()
    @IsString()
    margin?: number;

    @IsOptional()
    @IsString()
    discount?: number;
}
