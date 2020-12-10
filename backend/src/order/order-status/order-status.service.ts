import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '@order/order-status/entities/order-status.entity';
import { checkEntity } from '@shared/utils';

@Injectable()
export class OrderStatusService {
    constructor(
        @InjectRepository(OrderStatus)
        private readonly statusRepository: Repository<OrderStatus>
    ) {}

    /**
     * Найти id статуса
     * @param status
     */
    findStatus(status: number) {
        return from(this.statusRepository.findOne({ status })).pipe(
            mergeMap(checkEntity('Статус заказа не существует'))
        );
    }
}
