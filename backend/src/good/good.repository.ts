import { of, from, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Repository, EntityRepository, Like, Raw } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Good } from '@good/entities/good.entity';
import { checkEntity } from '@shared/utils/check-entity.util';

@EntityRepository(Good)
export class GoodRepository extends Repository<Good> {
    cleanDublicates() {
        return from(this.find({ name: Like('%dub') })).pipe(
            mergeMap((dublicates) => from(this.remove(dublicates)))
        );
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
