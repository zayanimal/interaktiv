import { Observable, of, iif, from, forkJoin, throwError } from 'rxjs';
import { filter, skip, map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, EntityManager } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UserDto } from '@users/dto/user.dto';
import { CreateOrderDto } from '@order/dto/create-order.dto';
import { Order } from '@order/entities/order.entity';
import { DiscountService } from '@good/discount/discount.service';
import { MarginService } from '@good/margin/margin.service';
import { EnduserService } from '@enduser/enduser.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly discountService: DiscountService,
        private readonly marginService: MarginService,
        private readonly enduserService: EnduserService
    ) {}

    checkCompanyId(user: UserDto) {
        return iif(() => !!user.companyId,
            of(user),
            throwError(new BadRequestException('У пользователя отсутствует компания'))
        );
    }

    create(dto: CreateOrderDto, user: Observable<UserDto>) {
        // return of(this.orderRepository.create(dto)).pipe(
        //     mergeMap((ord) => this.orderRepository.save(ord))
        // );

        return from(user).pipe(
            mergeMap((usr) => this.checkCompanyId(usr)),

        );
    }

    list() {
        return this.orderRepository.find();
    }
}
