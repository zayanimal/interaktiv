import { Observable } from "rxjs";
import { SelectQueryBuilder, DeleteResult } from 'typeorm';
import { UserDto } from "@users/dto/user.dto";
import { Order } from "@order/entities/order.entity";

interface ICheckUser { userId: string; companyId: string; }

export interface ICheckOrderService {
    /**
     * Проверить существование пользователя и компании
     * @param user юзер из реквеста
     */
    user(user: UserDto): Observable<ICheckUser>

    /**
     * Проверить роль и выдать соответствующий список заказов
     * @param repository
     */
    role(user: UserDto, repository: SelectQueryBuilder<Order>): SelectQueryBuilder<Order>;

    /**
     * Проверить удалился ли заказ
     * @param removeData результат удаленного заказа
     */
    removed(removeData: DeleteResult): Observable<DeleteResult>

    /**
     * Проверить найден ли заказ
     * @param foundOrder
     */
    found(foundOrder: Order | undefined): Observable<any>
}
