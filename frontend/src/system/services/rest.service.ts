import { ajax } from 'rxjs/ajax';
import { TokenService } from '@system/services/token.service';
import { IHeader } from '@system/interfaces/header.interface';
import { ApiUrl } from '@system/decorators';

@ApiUrl('http://interaktiv:8000/')
export class RestService {
    url: string;

    tokenService: TokenService;

    constructor(token: TokenService) {
        this.url = '';
        this.tokenService = token;
    }

    private getHeader(params: IHeader) {
        return {
            url: this.url + params.url,
            headers: {
                Authorization: `Bearer ${this.tokenService.getToken()}`,
                'Content-Type': 'application/json',
            },
            method: params.method,
            body: params.body,
        };
    }

    get$(url: string) {
        return ajax(this.getHeader({ url, method: 'GET' }));
    }

    post$(url: string, body: object) {
        return ajax(
            this.getHeader({
                url,
                method: 'POST',
                body: body || {},
            }),
        );
    }

    put$(url: string, body: object) {
        return ajax(
            this.getHeader({
                url,
                method: 'PUT',
                body: body || {},
            }),
        );
    }

    delete$(url: string) {
        return ajax(this.getHeader({ url, method: 'DELETE' }));
    }
}
