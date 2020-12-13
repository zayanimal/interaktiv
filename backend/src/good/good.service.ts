import { of, from, forkJoin } from 'rxjs';
import { filter, last, tap, mapTo, switchMap, skip, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Raw } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { parse } from 'node-xlsx';
import { GoodRepository } from '@good/good.repository';
import { IGoodService, IDlinkRow } from '@good/interfaces';
import { PriceService } from '@good/price/price.service';
import { DescriptionService } from '@good/description/description.service';
import { RowEntity, GoodEntity } from '@good/serializers';
import { Good, GoodView } from '@good/entities';
import { FoundBuffer } from '@good/found-buffer.util';

@Injectable()
export class GoodService implements IGoodService {
    constructor(
        @InjectRepository(GoodRepository)
        private readonly goodRepository: GoodRepository,
        @InjectEntityManager()
        private readonly manager: EntityManager,
        private priceService: PriceService,
        private descriptionService: DescriptionService
    ) {}

    updatePricelist(buffer: ArrayBuffer, vendor: string) {
        const [{ data }] = parse(buffer);
        const foundBuffer = new FoundBuffer();

        return from(data as IDlinkRow[]).pipe(
            skip(2),
            filter(({ length }) => length === 8),
            map((row) => plainToClass(RowEntity, {
                name: row[1],
                price: row[6],
                description: row[2]
            })),
            mergeMap((row) => this.goodRepository.searchStrict(row.name).pipe(
                map((found) => found || row),
                mergeMap((entity) => entity instanceof Good
                ? of(entity).pipe(
                    tap((value) => foundBuffer.push(value.name)),
                    mergeMap((good) => (foundBuffer.check(good.name)
                        ? of(null)
                        : this.priceService.create(row.price, good))
                    )
                )
                : of(entity).pipe(
                    mergeMap(({ name, price, description }) => of(this.goodRepository.create({ name })).pipe(
                        mergeMap((createdGood) => from(this.goodRepository.save(createdGood)).pipe(
                            catchError(() => from(this.goodRepository.save(createdGood.setDublicate())))
                        )),
                        mergeMap((newGood) => forkJoin([
                            this.descriptionService.create({ description, vendor, good: newGood }),
                            this.priceService.create(price, newGood)
                        ]).pipe(mergeMap(([descr]) => this.goodRepository.setDescription(newGood, descr))))
                    ))
                ))
            )),
            last(),
            switchMap(() => {
                foundBuffer.clear();
                return this.goodRepository.cleanDublicates()
            }),
            mapTo({ message: 'Прайслист обновлён'})
        );
    }

    list() {
        return this.manager.find(GoodView);
    }

    search(name: string) {
        return from(this.manager.find(GoodView, {
            name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}:*')`)
        })).pipe(map((good) => plainToClass(GoodEntity, good)));
    }

    searchId(id: string) {
        return this.goodRepository.searchId(id);
    }
}
