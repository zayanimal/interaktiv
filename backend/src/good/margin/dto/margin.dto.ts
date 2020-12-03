import { IsNotEmpty, IsNumber } from 'class-validator';
import { Good } from '@good/entities/good.entity';
import { Company } from '@company/entities/company.entity';
import { Order } from '@order/entities/order.entity';

export class MarginDto {
    @IsNotEmpty()
    @IsNumber()
    margin!: number;

    @IsNotEmpty()
    good!: Good;

    @IsNotEmpty()
    company!: Company;

    @IsNotEmpty()
    order!: Order;
}
