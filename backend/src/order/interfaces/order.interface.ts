import { Observable } from "rxjs";
import { IPaginationMeta, IPaginationOptions } from "nestjs-typeorm-paginate";
import { UserDto } from "@users/dto/user.dto";
import { CreateOrderDto, UpdateOrderDto } from "@order/dto/order.dto";
import { IMessage } from '@shared/interfaces/message.interface';
import { OrderEntity } from '@order/order.serializer';
import { Good } from "@good/entities/good.entity";
import { Margin } from "@good/margin/entities/margin.entity";
import { Discount } from "@good/discount/entities/discount.entity";
import { Quantity } from "@good/quantity/entities/quantity.entity";
import { Price } from "@good/price/entities/price.entity";

export interface IOrderReduce {
    good: Good[],
    price: Price[],
    margin: Margin[],
    discount: Discount[],
    quantity: Quantity[]
}

export type IOrderReduceArr = [Good, Price, Margin, Discount, Quantity];

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
     */
    find(id: string): Observable<OrderEntity>;

    /**
     *
     * @param dto
     */
    update(dto: UpdateOrderDto, user: Observable<UserDto>): any

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
