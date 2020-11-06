import {
    get as getLs,
    set as setLs,
    remove as removeLs
} from 'local-storage';

export class TokenService {
    constructor(private token: string = getLs<string>('accessToken')) {}

    isExpired() {
        const jwt = JSON.parse(atob(this.token.split('.')[1]));
        const exp = jwt && jwt.exp && jwt.exp * 1000;

        return (exp ? Date.now() > exp : false);
    }

    getToken() {
        if (!this.token) { return null; }

        // if (this.isExpired()) {

        // }

        return this.token;
    }

    setToken(token: string) {
        if (token) {
            setLs('accessToken', token);
        } else {
            removeLs('accessToken');
        }

        this.token = token;
    }

    isLoggedIn() {
        return !!this.token;
    }
}

export const tokenService = new TokenService();
