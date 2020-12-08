import {
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsObject,
    IsUUID,
    IsArray,
    IsDefined,
    ValidateNested,
    IsPositive
} from 'class-validator';
import { Type } from 'class-transformer';
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

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    id!: string;

    @IsDefined()
    @IsPositive()
    @IsNumber()
    rate!: number;

    @ValidateNested()
    @IsArray()
    @IsDefined()
    @Type(() => GoodDto)
    good!: GoodDto[];

    @IsObject()
    @IsDefined()
    @ValidateNested()
    @Type(() => EnduserDto)
    enduser!: EnduserDto;

    @IsDefined()
    @IsPositive()
    @IsNumber()
    status?: number;
}
