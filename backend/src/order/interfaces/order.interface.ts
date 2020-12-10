import { Observable } from "rxjs";
import { IPaginationMeta, IPaginationOptions } from "nestjs-typeorm-paginate";
import { UserDto } from "@users/dto/user.dto";
import { CreateOrderDto } from "@order/dto/create-order.dto";
import { UpdateOrderDto } from '@order/dto/update-order.dto';
import { IMessage } from '@shared/interfaces/message.interface';
import { OrderEntity } from '@order/order.serializer';
import { Order } from "@order/entities/order.entity";

export interface IOrderService {
    /**
     * Проверить существование компании у пользователя
     * @param user
     */
    checkUser(user: Observable<UserDto>): Observable<{
        userId: string;
        companyId: string;
    }>

    /**
     * Создать новый заказ
     * @param dto данные заказа
     * @param user служебная информация
     */
    create(dto: CreateOrderDto, user: Observable<UserDto>): Observable<IMessage>

    /**
     * Поиск по айди компании
     * @param id айди компании
     * @param serial режим сериализации
     */
    find(id: string, serial: boolean): Observable<Order | OrderEntity>;

    /**
     * Обновить заказ
     * @param dto
     * @param user
     */
    update(dto: UpdateOrderDto, user: Observable<UserDto>): Observable<IMessage>

    /**
     * Удалить заказ по айди
     * @param id айди заказа
     */
    remove(id: string): Observable<IMessage>

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
