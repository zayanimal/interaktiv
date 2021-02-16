import { RestService } from '@system/services/rest.service';
import { CompanyNormalize } from '@admin/services/company-normalize.service';
import { IListableService } from '@admin/interfaces';
import { CompanyEntity } from '@admin/entities';

export class CompanyService implements IListableService {
    constructor(
        private readonly api: RestService,
        private readonly companyNormalize: CompanyNormalize
    ) {}

    public getList$(page: number) {
        return this.api.get$(`company?page=${page}&limit=30`);
    }

    public create$(dto: CompanyEntity) {
        return this.api.put$('company/', dto);
    }

    public update$(dto: object) {
        return this.api.put$('company/update/', dto);
    }

    public findId(id: string) {
        return this.api.get$(`company/search-id/${id}`);
    }

    public find$(name: string) {
        return this.api.get$(`company/search-name/${name}`);
    }

    public delete$(id: string) {
        return this.api.delete$(`company/${id}`);
    }

    public normalize<T>(entity: T) {
        return this.companyNormalize.normalize(entity);
    }

    public denormalize<T, E>(requisites: T, entities: E) {
        return this.companyNormalize.denormalize(requisites, entities);
    }
}
