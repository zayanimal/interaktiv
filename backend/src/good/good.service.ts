import { of, from, forkJoin } from 'rxjs';
import { filter, skip, map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, EntityManager } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { parse } from 'node-xlsx';
import { Good } from '@good/entities/good.entity';
import { GoodView } from '@good/entities/good-view.entity';
import { IDlinkRow } from '@good/interfaces/good.interface';
import { PriceService } from '@good/price/price.service';
import { MarginService } from '@good/margin/margin.service';
import { DescriptionService } from '@good/description/description.service';
import { DiscountService } from '@good/discount/discount.service';

@Injectable()
export class GoodService {
    constructor(
        @InjectRepository(Good)
        private readonly goodRepository: Repository<Good>,
        private readonly entityManager: EntityManager,
        private priceService: PriceService,
        private marginService: MarginService,
        private descriptionService: DescriptionService,
        private discountService: DiscountService
    ) {}

    /**
     * Добавить позиции в базу из файла xls
     * @param buffer файл прайслиста
     * @param vendor название вендора
     */
    createFromFile(buffer: ArrayBuffer, vendor: string) {
        const [{ data }] = parse(buffer);

        return from(data as IDlinkRow[]).pipe(
            skip(2),
            filter((r) => r.length === 8),
            mergeMap((row) => forkJoin({
                name: of(row[1].trim()),
                price: this.priceService.create(row[6]),
                margin: this.marginService.create(1.13),
                discount: this.discountService.create(1),
            }).pipe(
                map((createdRow) => this.goodRepository.create(createdRow)),
                mergeMap((rowEntities) => from(this.goodRepository.save(rowEntities)).pipe(
                    catchError(() => {
                        rowEntities.name = `${rowEntities.name}_dub`

                        return from(this.goodRepository.save(rowEntities));
                    })
                )),
                mergeMap((good) => this.descriptionService.create({
                    description: row[2],
                    vendor,
                    good
                }))
            )),
            toArray(),
            mergeMap(() => this.cleanDublicates()),
            map(() => ({ message: 'Прайслист загружен' }))
        );
    }

    /**
     * Очистить дубли оставшиейся после загрузки прайслиста
     */
    cleanDublicates() {
        return from(this.goodRepository.find({ name: Like('%dub%') })).pipe(
            mergeMap((dublicates) => from(this.goodRepository.remove(dublicates)))
        );
    }

    /**
     * Поиск товара по заданной подстроке
     * @param name
     */
    search(name: string) {
        return this.entityManager.find(GoodView, {
            name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}:*')`)
        });
    }
}
