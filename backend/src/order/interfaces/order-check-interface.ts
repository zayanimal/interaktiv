import { Observable } from "rxjs";
import { DeleteResult } from 'typeorm';
import { UserDto } from "@users/dto/user.dto";
import { Order } from "@order/entities/order.entity";

interface ICheckUser { userId: string; companyId: string; }

export interface ICheckOrderService {
    /**
     * Проверить существование пользователя и компании
     * @param user юзер из реквеста
     */
    checkUser(user: UserDto): Observable<ICheckUser>

    /**
     * Проверить удалился ли заказ
     * @param removeData результат удаленного заказа
     */
    checkRemovedOrder(removeData: DeleteResult): Observable<DeleteResult>

    /**
     * Проверить найден ли заказ
     * @param foundOrder
     */
    checkFoundOrder(foundOrder: Order | undefined): Observable<any>
}
