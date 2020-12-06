import { of, iif, throwError } from 'rxjs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder, DeleteResult } from 'typeorm';
import { ICheckOrderService } from '@order/interfaces/order-check-interface';
import { UserDto } from '@users/dto/user.dto';
import { Order } from '@order/entities/order.entity';


@Injectable()
export class CheckOrderService implements ICheckOrderService {
    constructor() {}

    user(user: UserDto) {
        return iif(() => !!user?.companyId && !!user?.userId,
            of({
                userId: user.userId as string,
                companyId: user.companyId as string
            }),
            throwError(new BadRequestException('У пользователя отсутствует компания'))
        );
    }

    role(user: UserDto, repository: SelectQueryBuilder<Order>) {
        return (user.role.includes('admin') ? repository : repository.where(
            'o."companyId" = :id', { id: user.companyId }
        ));
    }

    removed(orderRemove: DeleteResult) {
        return (orderRemove.affected ? of(orderRemove) : throwError(
            new BadRequestException('Заказ не существует')
        ))
    }

    found(foundOrder: Order | undefined) {
        return (foundOrder ? of(foundOrder) : throwError(
            new BadRequestException('Заказ не найден')
        ))
    }
}
