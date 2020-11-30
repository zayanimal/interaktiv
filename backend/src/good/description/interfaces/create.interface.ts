import { Good } from '@good/entities/good.entity';

export interface ICreate {
    description: string;
    vendor: string;
    good: Good;
}
