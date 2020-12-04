import { Observable } from "rxjs";
import { Pagination } from "nestjs-typeorm-paginate";
import { UserDto } from "@users/dto/user.dto";
import { CreateOrderDto } from "@order/dto/create-order.dto";
import { IMessage } from '@shared/interfaces/message.interface';
import { Order } from "@order/entities/order.entity";

interface ICheckUser { userId: string; companyId: string; }
interface IOrderListItem extends Pick<Order, "id" | "orderId" | "created"> {
    user: string;
    company: string;
    enduser: string;
    status: number;
}

export interface IOrderService {
    /**
     * Создать новый заказ
     * @param dto данные заказа
     * @param user служебная информация
     */
    create(dto: CreateOrderDto, user: Observable<UserDto>): Observable<IMessage>

    /**
     * Поиск по айди компании
     * @param id айди компании
     */
    find(id: string): any

    // update(dto): any

    /**
     * Список заказов с пагинацией
     * @param page
     * @param limit
     */
    list(page: number, limit: number): Observable<Omit<Pagination<IOrderListItem>, 'links'>>
}
