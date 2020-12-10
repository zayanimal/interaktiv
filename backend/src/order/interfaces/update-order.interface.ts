import { Enduser } from "@enduser/entities/enduser.entity";
import { OrderStatus } from "@order/order-status/entities/order-status.entity";

export interface IUpdateOrder {
    id: string;
    enduser: Enduser;
    status: OrderStatus;
}
