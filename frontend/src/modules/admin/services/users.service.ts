import { ApiService, apiService } from '@system/services/api.service';
import { ICreateUser, INewUser } from '@admin/interfaces/users.interface';

class UserService {
    constructor(private api: ApiService) {}

    getList$(page: number) {
        return this.api.get$(`users?page=${page}&limit=30`);
    }

    create$(user: ICreateUser) {
        return this.api.post$('auth/register', user);
    }

    delete$(username: string) {
        return this.api.delete$(`users/${username}`);
    }

    find$(username: string) {
        return this.api.get$(`users/${username}`);
    }

    add$(payload: INewUser) {
        return this.api.put$('auth/register', payload);
    }
}

export const userService = new UserService(apiService);
