import { of, from, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Repository, EntityRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { Order } from '@order/entities/order.entity';
import { OrderEntity, DEFAULT_GROUP, FIND_GROUP } from '@order/order.serializer';
import { INewOrder } from '@order/interfaces/new-order.interface';
import { IOrderReduce } from '@order/interfaces/order.interface';
import { UserDto } from '@users/dto/user.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    findOrder(id: string) {
        return from(this.createQueryBuilder('o')
            .select(['o', 'u.username', 'c.name', 'e.name', 's.status', 'g.id',
                'g.name', 'q.quantity', 'm.margin', 'd.discount', 'p.cost' ])
            .leftJoin('o.good', 'g')
            .leftJoin('o.price', 'op')
            .leftJoin('g.price', 'p', 'p.id = op.id')
            .leftJoin('g.margin', 'm', 'm."goodId" = g.id')
            .leftJoin('g.discount', 'd', 'd."goodId" = g.id')
            .leftJoin('g.quantity', 'q', 'q."goodId" = g.id')
            .leftJoin('o.user', 'u')
            .leftJoin('o.company', 'c')
            .leftJoin('o.enduser', 'e')
            .leftJoin('o.status', 's')
            .where('o.id = :id', { id })
            .andWhere('m."orderId" = o.id')
            .andWhere('d."orderId" = o.id')
            .andWhere('q."orderId" = o.id')
            .getOne()).pipe(
                mergeMap((order) => (order ? of(this.transform(order, FIND_GROUP)) : throwError(
                    new NotFoundException('Заказ не найден')
                )))
            );
    }

    saveOrder(orderData: INewOrder) {
        return of(this.create(orderData)).pipe(
            mergeMap((order) => from(this.save(order)))
        );
    }

    updateCreatedOrder(id: string, goods: IOrderReduce) {
        return from(this.findOne(id)).pipe(
            mergeMap((foundOrder) => (foundOrder ? of(foundOrder) : throwError(
                new NotFoundException('Заказ не найден')))
            ),
            mergeMap((foundOrder) => from(this.save(
                foundOrder.updateOrder(goods)
            )))
        );
    }

    deleteOrder(id: string) {
        return from(this.delete({ id })).pipe(
            mergeMap((deleteRes) => (deleteRes.affected ? of(deleteRes) : throwError(
                new NotFoundException('Заказ не существует')
            ))),
            map(() => ({ message: 'Заказ удален' }))
        );
    }

    listOrders(user: UserDto) {
        const query = this.createQueryBuilder('o')
            .select(['o', 'u.username', 'c.name', 'e.name', 's.status'])
            .leftJoin('o.user', 'u')
            .leftJoin('o.company', 'c')
            .leftJoin('o.enduser', 'e')
            .leftJoin('o.status', 's')
            .orderBy('o.orderId', 'DESC')

        return (user.role.includes('admin') ? query : query.where(
            'o."companyId" = :id', { id: user.companyId }
        ));
    }

    transform(order: Order, options = DEFAULT_GROUP) {
        return plainToClass(OrderEntity, order, options);
    }

    transformList(orders: Order[]) {
        return orders.map((order) => this.transform(order));
    }
}
