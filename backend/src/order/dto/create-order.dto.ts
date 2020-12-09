import {
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsObject
} from 'class-validator';
import { GoodDto } from '@good/dto/good.dto';
import { EnduserDto } from '@enduser/dto/enduser.dto';

export class CreateOrderDto {
    @IsNotEmpty()
    good!: GoodDto[];

    @IsNotEmpty()
    @IsNumber()
    rate!: number;

    @IsNotEmpty()
    @IsObject()
    enduser!: EnduserDto;

    @IsOptional()
    @IsNumber()
    status?: number;
}
