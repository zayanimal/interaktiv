import { Observable } from "rxjs";
import { UserDto } from "@users/dto/user.dto";
import { CreateOrderDto } from "@order/dto/create-order.dto";
import { IMessage } from '@shared/interfaces/message.interface';
import { Order } from "@order/entities/order.entity";

interface ICheckUser { userId: string; companyId: string; }

export interface IOrderService {
    /**
     * Проверить существование пользователя и компании
     * @param user юзер из реквеста
     */
    checkUser(user: UserDto): Observable<ICheckUser>

    /**
     * Создать новый заказ
     * @param dto данные заказа
     * @param user служебная информация
     */
    create(dto: CreateOrderDto, user: Observable<UserDto>): Observable<IMessage>

    /**
     * Список заказов
     */
    list(): Promise<Order[]>
}
