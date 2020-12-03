import { Observable, of, iif, from, forkJoin, throwError } from 'rxjs';
import { filter, skip, map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { IOrderService } from '@order/services/order/order.interface';
import { UserDto } from '@users/dto/user.dto';
import { CreateOrderDto } from '@order/dto/create-order.dto';
import { Order } from '@order/entities/order.entity';
import { OrderStatusService } from '@order/order-status/order-status.service';
import { UsersService } from '@users/services/users.service';
import { CompanyService } from '@company/company.service';
import { GoodService } from '@good/services/good.service';
import { DiscountService } from '@good/discount/discount.service';
import { MarginService } from '@good/margin/margin.service';
import { EnduserService } from '@enduser/enduser.service';

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly statusService: OrderStatusService,
        private readonly userService: UsersService,
        private readonly companyService: CompanyService,
        private readonly goodService: GoodService,
        private readonly discountService: DiscountService,
        private readonly marginService: MarginService,
        private readonly enduserService: EnduserService
    ) {}

    checkUser(user: UserDto) {
        return iif(() => !!user?.companyId && !!user?.userId,
            of({
                userId: user.userId as string,
                companyId: user.companyId as string
            }),
            throwError(new BadRequestException('У пользователя отсутствует компания'))
        );
    }

    create(dto: CreateOrderDto, user: Observable<UserDto>) {
        return from(user).pipe(
            mergeMap((usr) => this.checkUser(usr)),
            mergeMap((usr) => forkJoin({
                user: this.userService.searchId(usr.userId),
                company: this.companyService.searchId(usr.companyId),
                status: this.statusService.findStatus(1),
                enduser: this.enduserService.checkCreate(dto.enduser),
                good: from(dto.good).pipe(
                    mergeMap((good) => this.goodService.searchId(good.id)),
                    toArray()
                )
            }).pipe(
                mergeMap((orderData) => from(this.orderRepository.save(
                    this.orderRepository.create(orderData)
                )).pipe(
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
                            })
                        ])),
                        map(() => ({ message: `Ваш заказ создан. Номер заказа ${order.orderId}` }))
                    ))
                ))
            ))
        );
    }

    list() {
        return this.orderRepository.find();
    }
}
