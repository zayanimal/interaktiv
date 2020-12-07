import { Observable, of, from, forkJoin, throwError } from 'rxjs';
import { map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IOrderService } from '@order/interfaces/order.interface';
import { UserDto } from '@users/dto/user.dto';
import { CreateOrderDto } from '@order/dto/create-order.dto';
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

    create(dto: CreateOrderDto, user: Observable<UserDto>) {
        return from(user).pipe(
            mergeMap((user) => (user?.companyId && user?.userId
                ? of({ userId: user.userId, companyId: user.companyId })
                : throwError(new NotFoundException('У пользователя отсутствует компания'))
            )),
            mergeMap((usr) => forkJoin({
                rate: of(dto.rate),
                user: this.userService.searchId(usr.userId),
                company: this.companyService.searchId(usr.companyId),
                status: this.statusService.findStatus(1),
                enduser: this.enduserService.checkCreate(dto.enduser),
                price: from(dto.good).pipe(
                    mergeMap(({ id }) => this.priceService.searchId(id)),
                    toArray()
                ),
                good: from(dto.good).pipe(
                    mergeMap(({ id }) => this.goodService.searchId(id)),
                    toArray()
                ),
            }).pipe(
                mergeMap((orderData) => this.orderRepository.saveOrder(orderData).pipe(
                    mergeMap((order) => from(order.good).pipe(
                        mergeMap((good) => forkJoin([
                            this.marginService.create({
                                margin: 1.13,
                                good,
                                company: orderData.company,
                                order
                            }),
                            this.discountService.create({
                                discount: 1,
                                good,
                                enduser: orderData.enduser,
                                order
                            }),
                            this.quantityService.create({
                                quantity: 1,
                                good,
                                order
                            })
                        ])),
                        map(() => ({ message: `Ваш заказ создан. Номер заказа ${order.orderId}` }))
                    ))
                ))
            ))
        );
    }

    find(id: string) { return this.orderRepository.findOrder(id); }

    update(id: string) {

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
