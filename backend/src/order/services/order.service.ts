import { Observable, of, from, forkJoin, throwError } from 'rxjs';
import { map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IOrderService } from '@order/interfaces/order.interface';
import { UserDto } from '@users/dto/user.dto';
import { CreateOrderDto } from '@order/dto/create-order.dto';
import { Order } from '@order/entities/order.entity';
import { CheckOrderService } from '@order/services/check-order.service';
import { OrderStatusService } from '@order/order-status/order-status.service';
import { UsersService } from '@users/services/users.service';
import { CompanyService } from '@company/company.service';
import { GoodService } from '@good/services/good.service';
import { PriceService } from '@good/price/price.service';
import { DiscountService } from '@good/discount/discount.service';
import { MarginService } from '@good/margin/margin.service';
import { EnduserService } from '@enduser/enduser.service';

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly checkOrderService: CheckOrderService,
        private readonly statusService: OrderStatusService,
        private readonly userService: UsersService,
        private readonly companyService: CompanyService,
        private readonly goodService: GoodService,
        private readonly priceService: PriceService,
        private readonly discountService: DiscountService,
        private readonly marginService: MarginService,
        private readonly enduserService: EnduserService
    ) {}

    create(dto: CreateOrderDto, user: Observable<UserDto>) {
        return from(user).pipe(
            mergeMap(this.checkOrderService.checkUser),
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

    find(id: string) {
        return from(this.orderRepository.createQueryBuilder('o')
            .select(['o', 'u.username', 'c.name', 'e.name', 's.status', 'g.id',
                'g.name', 'm.margin', 'd.discount', 'p.cost' ])
            .leftJoin('o.good', 'g')
            .leftJoin('o.price', 'op')
            .leftJoin('g.price', 'p', 'p.id = op.id')
            .leftJoin('g.margin', 'm', 'm."goodId" = g.id')
            .leftJoin('g.discount', 'd', 'd."goodId" = g.id')
            .leftJoin('o.user', 'u')
            .leftJoin('o.company', 'c')
            .leftJoin('o.enduser', 'e')
            .leftJoin('o.status', 's')
            .where('o.id = :id', { id })
            .andWhere('m."orderId" = o.id')
            .andWhere('d."orderId" = o.id')
            .getOne()).pipe(
                mergeMap(this.checkOrderService.checkFoundOrder)
            );
    }

    update(id: string) {

    }

    remove(id: string) {
        return from(this.orderRepository.delete({ id })).pipe(
            mergeMap(this.checkOrderService.checkRemovedOrder),
            map(() => ({ message: 'Заказ удален' }))
        );
    }

    list(page: number, limit: number) {
        return from(
            paginate(this.orderRepository
                .createQueryBuilder('o')
                .select(['o', 'u.username', 'c.name', 'e.name', 's.status'])
                .leftJoin('o.user', 'u')
                .leftJoin('o.company', 'c')
                .leftJoin('o.enduser', 'e')
                .leftJoin('o.status', 's'),
                { page, limit }
        )).pipe(
            mergeMap(({ items, meta }) => forkJoin({
                items: from(items).pipe(
                    map((o) => ({
                        ...o,
                        user: o.user.username,
                        company: o.company.name,
                        enduser: o.enduser.name,
                        status: o.status.status
                    })),
                    toArray()
                ),
                meta: of(meta)
            })),
            catchError((err) => throwError(new InternalServerErrorException(err.message)))
        );
    }
}
