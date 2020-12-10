import { from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quantity } from '@good/quantity/entities/quantity.entity';
import { QuantityDto } from '@good/quantity/dto/quantity.dto';
import { ICheckCreateQty } from '@good/interfaces/good-details.interface'
import { checkEntity } from '@shared/utils/check-entity.util';
import { QUANTITY_GROUP } from '@order/constants/order-groups.constant';

@Injectable()
export class QuantityService {
    errorMessage: string;
    constructor(
        @InjectRepository(Quantity)
        private readonly quantityRepository: Repository<Quantity>
    ) { this.errorMessage = 'Количество не найдено' }

    /**
     * Создать новое количество товара в заказе
     * @param dto
     */
    create(dto: QuantityDto) {
        return from(this.quantityRepository.save(
            this.quantityRepository.create(dto)
        ));
    }

    /**
     * Обновить количество конкретного заказа
     * @param dto
     */
    update(dto: ICheckCreateQty) {
        return of(dto.user).pipe(
            map(({ role }) => role),
            map(QUANTITY_GROUP),
            mergeMap((permission) => (permission ? from(this.quantityRepository
                .createQueryBuilder('q')
                .select()
                .where('q."goodId" = :goodId', { goodId: dto.good.id })
                .andWhere('q."orderId" = :orderId', { orderId: dto.order.id })
                .getOne()).pipe(
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((margin) => from(this.quantityRepository.preload(
                        { id: margin.id, quantity: dto.quantity }
                    ))),
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((preloaded) => from(this.quantityRepository.save(preloaded)))
                )
            : of(null)))
        );
    }
}
