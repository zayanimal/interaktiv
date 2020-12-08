import { Observable, of, from, forkJoin, throwError } from 'rxjs';
import { map, reduce, mergeMap, catchError } from 'rxjs/operators';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserDto } from '@users/dto/user.dto';
import { CreateOrderDto, UpdateOrderDto } from '@order/dto/order.dto';
import { OrderStatusService } from '@order/order-status/order-status.service';
import { UsersService } from '@users/services/users.service';
import { CompanyService } from '@company/company.service';
import { GoodService } from '@good/services/good.service';
import { PriceService } from '@good/price/price.service';
import { DiscountService } from '@good/discount/discount.service';
import { MarginService } from '@good/margin/margin.service';
import { EnduserService } from '@enduser/enduser.service';
import { QuantityService } from '@good/quantity/quantity.service';
import { OrderRepository } from '@order/order.repository';
import { IOrderService, IOrderReduce, IOrderReduceArr } from '@order/interfaces/order.interface';

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        @InjectRepository(OrderRepository)
        private readonly orderRepository: OrderRepository,
        private readonly statusService: OrderStatusService,
        private readonly userService: UsersService,
        private readonly companyService: CompanyService,
        private readonly goodService: GoodService,
        private readonly priceService: PriceService,
        private readonly discountService: DiscountService,
        private readonly marginService: MarginService,
        private readonly quantityService: QuantityService,
        private readonly enduserService: EnduserService
    ) {}

    checkUser(user: Observable<UserDto>) {
        return from(user).pipe(
            mergeMap((user) => (user?.companyId && user?.userId
                ? of({ userId: user.userId, companyId: user.companyId })
                : throwError(new NotFoundException('У пользователя отсутствует компания'))
            ))
        );
    }

    orderData(dto: CreateOrderDto | UpdateOrderDto, user: Observable<UserDto>) {
        return this.checkUser(user).pipe(
            mergeMap((usr) => forkJoin({
                rate: of(dto.rate),
                user: this.userService.searchId(usr.userId),
                company: this.companyService.searchId(usr.companyId),
                status: this.statusService.findStatus(dto?.status || 1),
                enduser: this.enduserService.checkCreate(dto.enduser)
            }))
        );
    }

    create(dto: CreateOrderDto, user: Observable<UserDto>) {
        return this.orderData(dto, user).pipe(
            mergeMap((orderData) => this.orderRepository.saveOrder(orderData).pipe(
                mergeMap((order) => from(dto.good).pipe(
                    mergeMap((good) => this.goodService.searchId(good.id).pipe(
                        mergeMap((foundGood) => forkJoin([
                            of(foundGood),
                            this.priceService.searchId(good.id),
                            this.marginService.create({
                                margin: 1.13,
                                good: foundGood,
                                company: orderData.company,
                                order
                            }),
                            this.discountService.create({
                                discount: 1,
                                good: foundGood,
                                enduser: orderData.enduser,
                                order
                            }),
                            this.quantityService.create({
                                quantity: good?.quantity || 1,
                                good: foundGood,
                                order
                            })
                        ])),
                    )),
                    reduce<IOrderReduceArr, IOrderReduce>((acc, [g, p, m, d, q]) => {
                        acc.good.push(g);
                        acc.price.push(p);
                        acc.margin.push(m);
                        acc.discount.push(d);
                        acc.quantity.push(q)

                        return acc;
                    }, { good: [], price: [], margin: [], discount: [], quantity: [] }),
                    mergeMap((goods) => this.orderRepository.updateCreatedOrder(order.id, goods)),
                    map(() => ({ message: `Ваш заказ создан. Номер заказа ${order.orderId}` }))
                )),
            ))
        );
    }

    find(id: string) { return this.orderRepository.findOrder(id); }

    update(dto: UpdateOrderDto, user: Observable<UserDto>) {
        return this.orderData(dto, user);
    }

    remove(id: string) { return this.orderRepository.deleteOrder(id); }

    list({ page, limit }: IPaginationOptions, user: Observable<UserDto>) {
        return from(user).pipe(
            mergeMap((usr) => paginate(
                this.orderRepository.listOrders(usr),
                { page, limit }
            )),
            mergeMap(({ items, meta }) => forkJoin({
                items: of(this.orderRepository.transformList(items)),
                meta: of(meta)
            })),
            catchError((err) => throwError(new InternalServerErrorException(err.message)))
        );
    }
}
