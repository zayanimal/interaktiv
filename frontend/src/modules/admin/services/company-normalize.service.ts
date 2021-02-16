import { normalize, denormalize, schema } from 'normalizr';
import { ICompanyNormalize } from '@admin/interfaces';

export class CompanyNormalize implements ICompanyNormalize {
    private readonly companySchema = {
        requisites: [
            new schema.Entity('requisites', {
                bank: [new schema.Entity('bank')]
            })
        ]
    };

    normalize<T>(entity: T) {
        return normalize(entity, this.companySchema);
    }

    denormalize<T, E>(requisites: T, entities: E) {
        return denormalize({ requisites }, this.companySchema, entities);
    }
}
