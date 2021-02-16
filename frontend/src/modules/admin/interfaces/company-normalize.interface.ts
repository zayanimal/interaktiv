import { NormalizedSchema } from 'normalizr';

type Schema<T> = { [key: string]: { [key: string]: T } | undefined };

export interface ICompanyNormalize {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normalize<T>(entity: T): NormalizedSchema<Schema<T>, any>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    denormalize<T, E>(requisites: T, entities: E): any;
}
