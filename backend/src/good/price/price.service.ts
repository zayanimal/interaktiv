import { isString } from 'lodash';
import { of, from, throwError } from 'rxjs';
import { toArray, mergeMap } from 'rxjs/operators';
import { Injectable, BadRequestException } from '@nestjs/common';
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

    /**
     * Проверить существует ли прайс
     * @param price
     */
    checkPrice(price: Price | undefined) {
        return (price ? of(price) : throwError(
            new BadRequestException('Цены не существует')
        ));
    }

    /**
     * Поиск цены на ближайшую к текущей дате
     * @param id
     */
    searchId(id: string) {
        return from(this.priceRepository
            .createQueryBuilder('p')
            .where('p."goodId" = :id', { id })
            .orderBy('p.date', 'DESC')
            .limit(1)
            .getOne()).pipe(
                mergeMap((price) => this.checkPrice(price))
            );
    }
}
