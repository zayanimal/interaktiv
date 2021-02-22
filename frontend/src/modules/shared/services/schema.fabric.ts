import { schema, Schema } from 'normalizr';

export type SchemaFabricKeys = 'requisites';

export const schemaFabric = new Map<string, Schema>([
    [
        'requisites',
        {
            requisites: [
                new schema.Entity('requisites', {
                    bank: [new schema.Entity('bank')]
                })
            ]
        }
    ]
]);
