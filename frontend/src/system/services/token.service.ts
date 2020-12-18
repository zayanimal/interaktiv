import { get, set, remove } from 'local-storage';
import { ITokenService } from '@system/interfaces';

export class TokenService implements ITokenService {
    public token = get<string>('accessToken');

    public isExpired() {
        if (!this.token) return true;

        const jwt = JSON.parse(atob(this.token.split('.')[1]));
        const exp = jwt && jwt.exp && jwt.exp * 1000;

        return (exp ? Date.now() > exp : false);
    }

    public getToken() {
        if (!this.token) { return ''; }

        return this.token;
    }

    public setToken(token: string) {
        if (token) {
            set('accessToken', token);
        } else {
            remove('accessToken');
        }

        this.token = token;
    }

    public isLoggedIn() {
        return !this.isExpired();
    }

    public removeToken() {
        remove('accessToken');

        this.token = '';
    }
}
