import { from } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '@good/discount/entities/discount.entity';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private readonly discountRepository: Repository<Discount>
    ) {}

    /**
     * Создать скидки для каждого товара
     * @param discount
     */
    create(discount: number) {
        return from(this.discountRepository.save(
            this.discountRepository.create({ discount })
        )).pipe(toArray());
    }
}
