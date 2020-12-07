import { Company } from "@company/entities/company.entity";
import { Enduser } from "@enduser/entities/enduser.entity";
import { Discount } from "@good/discount/entities/discount.entity";
import { Good } from "@good/entities/good.entity";
import { Margin } from "@good/margin/entities/margin.entity";
import { Price } from "@good/price/entities/price.entity";
import { Quantity } from "@good/quantity/entities/quantity.entity";
import { OrderStatus } from "@order/order-status/entities/order-status.entity";
import { Users } from "@users/entities/users.entity";

export interface IOrderEntity {
    id: string;
    rate: number;
    orderId: number;
    created: string;
    user: Users;
    company: Company;
    enduser: Enduser;
    good: Good[];
    price: Price[];
    discount: Discount[];
    margin: Margin[];
    quantity: Quantity[];
    status: OrderStatus;
}
