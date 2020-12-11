import { isString } from 'lodash';
import { Transform } from 'class-transformer';

export class RowEntity {
    @Transform((name: string) => name.trim())
    name!: string;

    @Transform((price) => (isString(price) ? 0 : price))
    price!: number;

    description!: string;
}
