import { of, from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '@good/discount/entities/discount.entity';
import { DiscountDto } from '@good/discount/dto/discount.dto';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private readonly discountRepository: Repository<Discount>
    ) {}

    /**
     * Создать скидку для товара
     * @param discount
     */
    create(dto: DiscountDto) {
        return from(this.discountRepository.save(
            this.discountRepository.create(dto)
        ));
    }

    checkCreate(goodId: string, orderId: string) {
        return from(this.discountRepository
            .createQueryBuilder('d')
            .select()
            .where('d."goodId" = :goodId', { goodId })
            .andWhere('d."orderId" = :orderId', { orderId })
            .getOne()).pipe(
                mergeMap((margin) => margin ? of(margin) : throwError(
                    new NotFoundException('Скидка не найдена')
                ))
            );
    }
}
