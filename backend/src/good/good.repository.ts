import { from } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Repository, EntityRepository, Like } from 'typeorm';
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

    setDescription(good: Good, description: Description) {
        return from(this.preload(good.setDescription(description))).pipe(
            mergeMap(checkEntity('Товар не существует')),
            switchMap((updatedEntity) => this.save(updatedEntity))
        )
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
