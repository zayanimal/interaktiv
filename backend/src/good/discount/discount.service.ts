import { from } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
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
}
