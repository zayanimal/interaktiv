import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Company } from "@company/entities/company.entity";
import { Enduser } from "@enduser/entities/enduser.entity";
import { Discount } from "@good/discount/entities/discount.entity";
import { Good } from "@good/entities/good.entity";
import { Margin } from "@good/margin/entities/margin.entity";
import { Price } from "@good/price/entities/price.entity";
import { Quantity } from "@good/quantity/entities/quantity.entity";
import { OrderStatus } from "@order/order-status/entities/order-status.entity";
import { Users } from "@users/entities/users.entity";
import { IOrderEntity } from '@order/interfaces/order-entity.interface';

export const findGroup = ['find'];

const computeCost = (...values: number[]) => values.reduce(
    (acc, num) => +(acc * num).toFixed(2), 1);

export class OrderEntity implements IOrderEntity {
    id!: string;
    rate!: number;
    orderId!: number;
    created!: string;

    @Transform((usr) => usr.username)
    user!: Users;

    @Transform((comp) => comp.name)
    company!: Company;

    @Transform((enduser) => enduser.name)
    enduser!: Enduser;

    @Expose({ groups: findGroup })
    @Transform((goods) => goods.map((good: Good) => ({
        id: good.id,
        name: good.name,
        cost: computeCost(
            good.price[0].cost,
            good.discount[0].discount,
            good.margin[0].margin,
        ),
        quantity: good.quantity[0].quantity
    })))
    good!: Good[];

    @Exclude()
    price!: Price[];

    @Exclude()
    discount!: Discount[];

    @Exclude()
    margin!: Margin[];

    @Exclude()
    quantity!: Quantity[];

    @Transform((status) => status.status)
    status!: OrderStatus;
}
