import { from, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Margin } from '@good/margin/entities/margin.entity';
import { MarginDto } from '@good/margin/dto/margin.dto';
import { Company } from '@company/entities/company.entity';
import { Order } from '@order/entities/order.entity';
import { OrderEntity } from '@order/order.serializer';
import { Good } from '@good/entities/good.entity';

interface ICheckCreateMargin {
    margin: number;
    good: Good;
    order: Order;
}

@Injectable()
export class MarginService {
    constructor(
        @InjectRepository(Margin)
        private readonly marginRepository: Repository<Margin>
    ) {}

    checkMargin(margin: Margin | undefined) {
        return (margin ? of(margin) : throwError(
            new NotFoundException('Прибыль не найдена')
        ));
    }

    /**
     * Создать уровень прибыли для товара
     * @param margin
     */
    create(dto: MarginDto) {
        return from(this.marginRepository.save(
            this.marginRepository.create(dto)
        ));
    }

    checkCreate(dto: ICheckCreateMargin) {
        return from(this.marginRepository
            .createQueryBuilder('m')
            .select()
            .where('m."goodId" = :goodId', { goodId: dto.good.id })
            .andWhere('m."orderId" = :orderId', { orderId: dto.order.id })
            .getOne()).pipe(
                mergeMap((margin) => this.checkMargin(margin)),
                mergeMap((margin) => from(this.marginRepository.preload(
                    { id: margin.id, margin: dto.margin }
                ))),
                mergeMap((margin) => this.checkMargin(margin)),
                mergeMap((preloaded) => from(this.marginRepository.save(preloaded)))
            );
    }
}
