import { of, iif, throwError } from 'rxjs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ICheckOrderService } from '@order/interfaces/order-check-interface';
import { UserDto } from '@users/dto/user.dto';
import { Order } from '@order/entities/order.entity';


@Injectable()
export class CheckOrderService implements ICheckOrderService {
    constructor() {}

    checkUser(user: UserDto) {
        return iif(() => !!user?.companyId && !!user?.userId,
            of({
                userId: user.userId as string,
                companyId: user.companyId as string
            }),
            throwError(new BadRequestException('У пользователя отсутствует компания'))
        );
    }

    checkRemovedOrder(orderRemove: DeleteResult) {
        return (orderRemove.affected ? of(orderRemove) : throwError(
            new BadRequestException('Заказ не существует')
        ))
    }

    checkFoundOrder(foundOrder: Order | undefined) {
        return (foundOrder ? of(foundOrder) : throwError(
            new BadRequestException('Заказ не найден')
        ))
    }
}
