import { RestService } from '@system/services/rest.service';
import { INewUser } from '@admin/interfaces/users.interface';

export class UsersService {
    constructor(private api: RestService) {}

    getList$(page: number) {
        return this.api.get$(`users?page=${page}&limit=30`);
    }

    add$(dto: INewUser) {
        return this.api.put$('auth/register', dto);
    }

    find$(username: string) {
        return this.api.get$(`users/${username}`);
    }

    update$(username: string, dto: INewUser) {
        return this.api.put$(`users/edit/${username}`, dto);
    }

    delete$(username: string) {
        return this.api.delete$(`users/${username}`);
    }
}
