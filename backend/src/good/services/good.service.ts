import { of, from, forkJoin, throwError, Observable } from 'rxjs';
import { filter, take, tap, skip, map, mergeMap, toArray, catchError } from 'rxjs/operators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, EntityManager } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { parse } from 'node-xlsx';
import { Good } from '@good/entities/good.entity';
import { GoodView } from '@good/entities/good-view.entity';
import { IGoodService } from '@good/interfaces/good-service.interface';
import { IDlinkRow } from '@good/interfaces/row.interface';
import { PriceService } from '@good/price/price.service';
import { DescriptionService } from '@good/description/description.service';

@Injectable()
export class GoodService implements IGoodService {
    constructor(
        @InjectRepository(Good)
        private readonly goodRepository: Repository<Good>,
        private readonly entityManager: EntityManager,
        private priceService: PriceService,
        private descriptionService: DescriptionService,
    ) {}

    createFromFile(buffer: ArrayBuffer, vendor: string) {
        const [{ data }] = parse(buffer);

        return from(data as IDlinkRow[]).pipe(
            skip(2),
            filter((r) => r.length === 8),
            take(10),
            mergeMap((row) => forkJoin({
                name: of(row[1].trim()),
                price: this.priceService.create(row[6])
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

    cleanDublicates() {
        return from(this.goodRepository.find({ name: Like('%dub%') })).pipe(
            mergeMap((dublicates) => from(this.goodRepository.remove(dublicates)))
        );
    }

    checkGoodExistance(good: Good | undefined) {
        return (good ? of(good) : throwError(
            new BadRequestException('Товар не существует')
        ));
    }

    search(name: string) {
        // return this.entityManager.find(GoodView, {
        //     name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}:*')`)
        // });

        return from(this.goodRepository.find({
            name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}:*')`)
        }));
    }

    searchId(id: string) {
        return from(this.goodRepository.findOne({ id })).pipe(
            mergeMap((good) => this.checkGoodExistance(good))
        );
    }
}
