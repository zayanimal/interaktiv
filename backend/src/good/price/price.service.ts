import { isString } from 'lodash';
import { from, of } from 'rxjs';
import { toArray, tap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '@good/price/entities/price.entity';
import { checkEntity } from '@shared/utils';
import { Good } from '@good/entities/good.entity';

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
    create(cost: number, good: Good) {
        return of(this.priceRepository.create({ cost, good })).pipe(
            mergeMap((price) => from(this.priceRepository.save(price)))
        );
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
                mergeMap(checkEntity('Цена не существует'))
            );
    }
}
