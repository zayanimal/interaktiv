import { of, from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '@order/order-status/entities/order-status.entity';

@Injectable()
export class OrderStatusService {
    constructor(
        @InjectRepository(OrderStatus)
        private readonly statusRepository: Repository<OrderStatus>
    ) {}

    /**
     * Проверить существование статуса в базе
     * @param status
     */
    checkStatus(status: OrderStatus | undefined) {
        return (status ? of(status) : throwError(
            new BadRequestException('Статус заказа не существует')
        ));
    }

    /**
     * Найти id статуса
     * @param status
     */
    findStatus(status: number) {
        return from(this.statusRepository.findOne({ status })).pipe(
            mergeMap((status) => this.checkStatus(status))
        );
    }
}
