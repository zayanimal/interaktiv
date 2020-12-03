import { IsNotEmpty, IsNumber } from 'class-validator';
import { Good } from '@good/entities/good.entity';
import { Enduser } from '@enduser/entities/enduser.entity';
import { Order } from '@order/entities/order.entity';

export class DiscountDto {
    @IsNotEmpty()
    @IsNumber()
    discount!: number;

    @IsNotEmpty()
    good!: Good;

    @IsNotEmpty()
    enduser!: Enduser;

    @IsNotEmpty()
    order!: Order;
}
