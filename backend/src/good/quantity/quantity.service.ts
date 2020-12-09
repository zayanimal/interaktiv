import { of, from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quantity } from '@good/quantity/entities/quantity.entity';
import { QuantityDto } from '@good/quantity/dto/quantity.dto';

@Injectable()
export class QuantityService {
    constructor(
        @InjectRepository(Quantity)
        private readonly quantityRepository: Repository<Quantity>
    ) {}

    /**
     * Создать новое количество товара в заказе
     * @param dto
     */
    create(dto: QuantityDto) {
        return from(this.quantityRepository.save(
            this.quantityRepository.create(dto)
        ));
    }

    checkCreate(goodId: string, orderId: string) {
        return from(this.quantityRepository
            .createQueryBuilder('q')
            .select()
            .where('q."goodId" = :goodId', { goodId })
            .andWhere('q."orderId" = :orderId', { orderId })
            .getOne()).pipe(
                mergeMap((margin) => margin ? of(margin) : throwError(
                    new NotFoundException('Скидка не найдена')
                ))
            );
    }
}
