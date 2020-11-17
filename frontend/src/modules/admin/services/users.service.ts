import { ApiService, apiService } from '@system/services/api.service';
import { ICreateUser } from '@admin/interfaces/users.interface';

class UserService {
    constructor(private api: ApiService) {}

    getList(page: number) {
        return this.api.get$(`users?page=${page}&limit=10`);
    }

    create(user: ICreateUser) {
        return this.api.post$('auth/register', user);
    }

    delete(username: string) {
        return this.api.delete$(`users/${username}`);
    }

    find(username: string) {
        return this.api.get$(`users/${username}`);
    }
}

export const userService = new UserService(apiService);
