import { RestService } from '@system/services/rest.service';
import { IListableService } from '@admin/interfaces';
import { CompanyEntity } from '@admin/entities';

export class CompanyService implements IListableService {
    constructor(private readonly api: RestService) {}

    public getList$(page: number) {
        return this.api.get$(`company?page=${page}&limit=30`);
    }

    public create$(dto: CompanyEntity) {
        return this.api.put$('company/', dto);
    }

    public update$(dto: CompanyEntity) {
        return this.api.put$(`company/update/`, dto);
    }

    public findId(id: string) {
        return this.api.get$(`company/search-id/${id}`);
    }

    public find$(name: string) {
        return this.api.get$(`company/search-name/${name}`);
    }

    public delete$(name: string) {
        return this.api.delete$(`company/${name}`);
    }
}
