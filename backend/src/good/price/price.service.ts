import { isString } from 'lodash';
import { from } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '@good/price/entities/price.entity';

@Injectable()
export class PriceService {
    constructor(
        @InjectRepository(Price)
        private readonly priceRepository: Repository<Price>
    ) {}

    /**
     * Создать цену для товара на текущую дату
     * @param cost цена по прайсу
     */
    create(cost: number | string) {
        return from(this.priceRepository.save(
            this.priceRepository.create({ cost: (isString(cost) ? 0 : cost) })
        )).pipe(toArray());
    }
}
