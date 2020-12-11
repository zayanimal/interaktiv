import { of, from, forkJoin } from 'rxjs';
import { filter, last, tap, mapTo, skip, switchMap, reduce, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { parse } from 'node-xlsx';
import { GoodRepository } from '@good/good.repository';
import { IGoodService } from '@good/interfaces/good-service.interface';
import { IDlinkRow } from '@good/interfaces/row.interface';
import { PriceService } from '@good/price/price.service';
import { DescriptionService } from '@good/description/description.service';
import { RowEntity } from '@good/serializers/price-row.serializer';
import { Good } from '@good/entities/good.entity';

interface IReduce {
    found: string[];
    list: string[];
    price: number;
    good: Good;
}

@Injectable()
export class GoodService {
    constructor(
        @InjectRepository(GoodRepository)
        private readonly goodRepository: GoodRepository,
        private priceService: PriceService,
        private descriptionService: DescriptionService,
    ) {}

    update(buffer: ArrayBuffer, vendor: string) {
        const [{ data }] = parse(buffer);

        return from(data as IDlinkRow[]).pipe(
            skip(2),
            filter(({ length }) => length === 8),
            map((row) => plainToClass(RowEntity, {
                name: row[1],
                price: row[6],
                description: row[2]
            })),
            mergeMap(({ name, price, description }) => forkJoin([
                of({ name, price, description }),
                this.goodRepository.searchStrict(name)
            ])),
            mergeMap(([{ name, price, description }, gd]) => of(gd).pipe(
                mergeMap((good) => (good
                    ? forkJoin([of(price), of(good)])
                    : of(this.goodRepository.create({ name })).pipe(
                        tap(console.log),
                        mergeMap((createdGood) => from(this.goodRepository.save(createdGood)).pipe(
                            catchError(() => from(this.goodRepository.save(createdGood.setDublicate())))
                        )),
                        mergeMap((newGood) => forkJoin([
                            this.priceService.create(price, newGood),
                            this.descriptionService.create({
                                description,
                                vendor,
                                good: newGood
                            })
                        ]))
                    ))
                )
            )),
            filter(([first]) => typeof first === 'number'),
            map((values) => values as [number, Good]),
            reduce<[number, Good], IReduce>((acc, [price, good]) => {
                acc.list.push(good.name);

                if (acc.list.filter((value) => value === good.name).length > 1) {
                    acc.found.push(good.name)
                }

                acc.price = price;

                return acc;
            }, { found: [], list: [], price: 0, good: new Good() }),
            mergeMap(({ found, price, good }) => (found.some((value) => value === good.name)
                ? of(null)
                : this.priceService.create(price, good))
            ),
            last(),
            switchMap(() => this.goodRepository.cleanDublicates()),
            mapTo({ message: 'Прайслист обновлён'})
        );
    }

    search(name: string) {
        return this.goodRepository.search(name);
    }

    searchId(id: string) {
        return this.goodRepository.searchId(id);
    }
}
