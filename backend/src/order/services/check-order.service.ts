import { of, iif, throwError } from 'rxjs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ICheckOrderService } from '@order/interfaces/order-check-interface';
import { UserDto } from '@users/dto/user.dto';

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
}
