import { Users } from "@users/entities/users.entity";
import { Company } from "@company/entities/company.entity";
import { OrderStatus } from "@order/order-status/entities/order-status.entity";
import { Enduser } from "@enduser/entities/enduser.entity";

export interface INewOrder {
    rate: number;
    user: Users | undefined;
    company: Company;
    status: OrderStatus;
    enduser: Enduser;
}
