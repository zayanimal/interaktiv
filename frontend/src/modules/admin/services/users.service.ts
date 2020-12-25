import { RestService } from '@system/services/rest.service';
import { IListableService, INewUser } from '@admin/interfaces';

export class UsersService implements IListableService {
    constructor(private readonly api: RestService) {}

    public getList$(page: number) {
        return this.api.get$(`users?page=${page}&limit=30`);
    }

    public create$(dto: INewUser) {
        return this.api.put$('auth/register', dto);
    }

    public find$(username: string) {
        return this.api.get$(`users/${username}`);
    }

    public update$(dto: INewUser, username: string) {
        return this.api.put$(`users/edit/${username}`, dto);
    }

    public delete$(username: string) {
        return this.api.delete$(`users/${username}`);
    }
}
