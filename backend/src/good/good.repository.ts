import { of, from, throwError } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Repository, EntityRepository, Like, Raw } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Good } from '@good/entities/good.entity';
import { checkEntity } from '@shared/utils/check-entity.util';
import { Description } from './description/entities/description.entity';

@EntityRepository(Good)
export class GoodRepository extends Repository<Good> {
    cleanDublicates() {
        return from(this.find({ name: Like('%dub') })).pipe(
            mergeMap((dublicates) => from(this.remove(dublicates)))
        );
    }

    listGoods() {
        return this.query(`
            select
                distinct on(p."goodId")
                g.id,
                g.name,
                p.cost,
                p.date,
                d.vendor
            from good g
            left join description d on d."goodId" = g.id
            left join price p on p."goodId" = g.id
            where p.date <= current_timestamp
            order by p."goodId", p.date desc
        `);
    }

    setDescription(good: Good, description: Description) {
        return from(this.preload(good.setDescription(description))).pipe(
            mergeMap(checkEntity('Товар не существует')),
            switchMap((updatedEntity) => this.save(updatedEntity))
        )
    }

    search(name: string) {
        return from(this.find({
            name: Raw((col) => `to_tsvector(${col}) @@ to_tsquery('${name}:*')`)
        }));
    }

    searchStrict(name: string) {
        return from(this.findOne({ name }));
    }

    searchId(id: string) {
        return from(this.findOne({ id })).pipe(
            mergeMap(checkEntity('Товар не существует'))
        );
    }
}
