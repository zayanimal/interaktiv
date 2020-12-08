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
}

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    id!: string;

    @IsOptional()
    @IsDefined()
    @IsPositive()
    @IsNumber()
    rate?: number;

    @IsOptional()
    @ValidateNested()
    @IsArray()
    @IsDefined()
    @Type(() => GoodDto)
    good!: GoodDto[];

    @IsOptional()
    @IsObject()
    @IsDefined()
    @ValidateNested()
    @Type(() => EnduserDto)
    enduser?: EnduserDto;

    @IsOptional()
    @IsDefined()
    @IsPositive()
    @IsNumber()
    status?: number;
}
