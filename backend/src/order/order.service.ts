import { of, from, forkJoin } from 'rxjs';
import { filter, skip, map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, EntityManager } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CreateOrderDto } from '@order/dto/order.dto';
import { Order } from '@order/entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    create(order: CreateOrderDto) {

    }
}
