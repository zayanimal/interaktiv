import { IsNotEmpty, IsObject, IsArray, IsUUID, IsOptional } from 'class-validator';
import { Good } from '@good/entities/good.entity';

export class CreateOrderDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsNotEmpty()
    good!: Good[];
}
