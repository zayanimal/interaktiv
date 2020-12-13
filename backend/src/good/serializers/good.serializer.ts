import { round } from 'lodash';
import { Transform } from 'class-transformer';
import { GoodConfig } from '@/good.config';

export class GoodEntity {
    id!: string;

    name!: string;

    @Transform((cost) => round(cost * GoodConfig.MARGIN, 2))
    cost!: number;

    date!: string;

    vendor!: string;
}
