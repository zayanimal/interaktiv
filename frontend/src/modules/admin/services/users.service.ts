import { RestService } from '@system/services/rest.service';
import { IUsersService, INewUser } from '@admin/interfaces';

export class UsersService implements IUsersService {
    constructor(private api: RestService) {}

    public getList$(page: number) {
        return this.api.get$(`users?page=${page}&limit=30`);
    }

    public add$(dto: INewUser) {
        return this.api.put$('auth/register', dto);
    }

    public find$(username: string) {
        return this.api.get$(`users/${username}`);
    }

    public update$(username: string, dto: INewUser) {
        return this.api.put$(`users/edit/${username}`, dto);
    }

    public delete$(username: string) {
        return this.api.delete$(`users/${username}`);
    }
}
