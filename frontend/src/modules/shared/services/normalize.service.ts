import { normalize, denormalize } from 'normalizr';
import { schemaFabric, SchemaFabricKeys } from '@shared/services';
import { INormalizator } from '@shared/interfaces';

export class Normalizator implements INormalizator {
    schema = {};

    constructor(schemaName: SchemaFabricKeys) {
        const checkSchema = schemaFabric.get(schemaName);
        if (checkSchema) {
            this.schema = checkSchema;
        }
    }

    normalize<T>(entity: T) {
        return normalize(entity, this.schema);
    }

    denormalize<T, E>(requisites: T, entities: E) {
        return denormalize({ requisites }, this.schema, entities);
    }
}
