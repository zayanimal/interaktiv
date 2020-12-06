import { IsNotEmpty, IsNumber } from 'class-validator';
import { Good } from '@good/entities/good.entity';
import { Order } from '@order/entities/order.entity';

export class QuantityDto {
    @IsNotEmpty()
    @IsNumber()
    qty!: number;

    @IsNotEmpty()
    good!: Good;

    @IsNotEmpty()
    order!: Order;
}
