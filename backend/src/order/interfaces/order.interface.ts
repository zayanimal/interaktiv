import { Observable } from "rxjs";
import { IPaginationMeta, IPaginationOptions } from "nestjs-typeorm-paginate";
import { UserDto } from "@users/dto/user.dto";
import { CreateOrderDto } from "@order/dto/create-order.dto";
import { IMessage } from '@shared/interfaces/message.interface';
import { Order } from "@order/entities/order.entity";
import { OrderEntity } from '@order/order.serializer';

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
    find(id: string): Observable<Order>;

    /**
     *
     * @param dto
     */
    update(id: string, dto: CreateOrderDto): any

    /**
     * Удалить заказ по айди
     * @param id айди заказа
     */
    remove(id: string): any

    /**
     * Список заказов с пагинацией
     * @param options объект с параметрами пагинации
     * @param user
     */
    list(options: IPaginationOptions, user: Observable<UserDto>): Observable<{
        items: OrderEntity[];
        meta: IPaginationMeta;
    }>
}
