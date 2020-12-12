import { of, from, forkJoin } from 'rxjs';
import { filter, last, tap, mapTo, switchMap, skip, map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { parse } from 'node-xlsx';
import { GoodRepository } from '@good/good.repository';
import { IGoodService } from '@good/interfaces/good-service.interface';
import { IDlinkRow } from '@good/interfaces/row.interface';
import { PriceService } from '@good/price/price.service';
import { DescriptionService } from '@good/description/description.service';
import { RowEntity } from '@good/serializers/price-row.serializer';
import { Good } from '@good/entities/good.entity';
import { FoundBuffer } from '@good/found-buffer.util';

@Injectable()
export class GoodService {
    constructor(
        @InjectRepository(GoodRepository)
        private readonly goodRepository: GoodRepository,
        private priceService: PriceService,
        private descriptionService: DescriptionService,
        private foundBuffer: FoundBuffer
    ) {}

    updatePricelist(buffer: ArrayBuffer, vendor: string) {
        const [{ data }] = parse(buffer);

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
                    tap((value) => this.foundBuffer.push(value.name)),
                    mergeMap((good) => (this.foundBuffer.check(good.name)
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
                this.foundBuffer.clear();
                return this.goodRepository.cleanDublicates()
            }),
            mapTo({ message: 'Прайслист обновлён'})
        );
    }

    list() {
        return this.goodRepository.listGoods();
    }

    update(good: Good) {

    }

    search(name: string) {
        return this.goodRepository.search(name);
    }

    searchId(id: string) {
        return this.goodRepository.searchId(id);
    }
}
