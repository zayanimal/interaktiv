import { from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Margin } from '@good/margin/entities/margin.entity';
import { MarginDto } from '@good/margin/dto/margin.dto';
import { ICheckCreateMargin } from '@good/interfaces/good-details.interface';
import { checkEntity } from '@shared/utils/check-entity.util';
import { MARGIN_GROUP } from '@order/constants/order-groups.constant';

@Injectable()
export class MarginService {
    errorMessage: string;
    constructor(
        @InjectRepository(Margin)
        private readonly marginRepository: Repository<Margin>
    ) { this.errorMessage = 'Прибыль не найдена'; }

    /**
     * Создать уровень прибыли для товара
     * @param margin
     */
    create(dto: MarginDto) {
        return from(this.marginRepository.save(
            this.marginRepository.create(dto)
        ));
    }

    /**
     * Обновить маржинальность конкретного заказа
     * @param dto
     */
    update(dto: ICheckCreateMargin) {
        return of(dto.user).pipe(
            map(({ role }) => role),
            map(MARGIN_GROUP),
            mergeMap((permission) => (permission ? from(this.marginRepository
                .createQueryBuilder('m')
                .select()
                .where('m."goodId" = :goodId', { goodId: dto.good.id })
                .andWhere('m."orderId" = :orderId', { orderId: dto.order.id })
                .getOne()).pipe(
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((margin) => from(this.marginRepository.preload(
                        { id: margin.id, margin: dto.margin }
                    ))),
                    mergeMap(checkEntity(this.errorMessage)),
                    mergeMap((preloaded) => from(this.marginRepository.save(preloaded)))
                )
            : of(null)))
        );
    }
}
