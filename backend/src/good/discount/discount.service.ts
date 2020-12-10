import { from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '@good/discount/entities/discount.entity';
import { DiscountDto } from '@good/discount/dto/discount.dto';
import { ICheckCreateDiscount } from '@good/interfaces/good-details.interface'
import { checkEntity } from '@shared/utils/check-entity.util';
import { DISCOUNT_GROUP } from '@order/constants/order-groups.constant';

@Injectable()
export class DiscountService {
    errorMessage: string;
    constructor(
        @InjectRepository(Discount)
        private readonly discountRepository: Repository<Discount>
    ) { this.errorMessage = 'Скидка не найдена' }

    /**
     * Создать скидку для товара
     * @param discount
     */
    create(dto: DiscountDto) {
        return from(this.discountRepository.save(
            this.discountRepository.create(dto)
        ));
    }

    /**
     * Обновить скидки конкретного заказа
     * @param dto
     */
    update(dto: ICheckCreateDiscount) {
        return of(dto.user).pipe(
            map(({ role }) => role),
            map(DISCOUNT_GROUP),
            mergeMap((permission) => (permission ? from(this.discountRepository
                .createQueryBuilder('d')
                .select()
                .where('d."goodId" = :goodId', { goodId: dto.good.id })
                .andWhere('d."orderId" = :orderId', { orderId: dto.order.id })
                .getOne()).pipe(
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((margin) => from(this.discountRepository.preload(
                        { id: margin.id, discount: dto.discount }
                    ))),
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((preloaded) => from(this.discountRepository.save(preloaded)))
                )
            : of(null)))
        );
    }
}
