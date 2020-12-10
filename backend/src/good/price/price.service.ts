import { isString } from 'lodash';
import { from } from 'rxjs';
import { toArray, mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '@good/price/entities/price.entity';
import { checkEntity } from '@shared/utils';

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
