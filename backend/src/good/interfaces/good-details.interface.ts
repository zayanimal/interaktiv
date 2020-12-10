import { Good } from "@good/entities/good.entity";
import { Order } from "@order/entities/order.entity";
import { UserDto } from "@users/dto/user.dto";

interface ICheckCreate {
    good: Good;
    order: Order;
    user: UserDto
}

export interface ICheckCreateMargin extends ICheckCreate {
    margin: number;
}

export interface ICheckCreateDiscount extends ICheckCreate {
    discount: number;
}

export interface ICheckCreateQty extends ICheckCreate {
    quantity: number;
}
