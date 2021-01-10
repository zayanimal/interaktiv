import { ajax } from 'rxjs/ajax';
import { TokenService } from '@system/services/token.service';
import { IRestService, IHeader } from '@system/interfaces';
import { ApiUrl } from '@system/decorators';

@ApiUrl('https://http://interaktiv.iskor.ru/api/')
export class RestService implements IRestService {
    constructor(private tokenService: TokenService) {}

    private url = '';

    private getHeader(params: IHeader): object {
        return {
            url: this.url + params.url,
            headers: {
                Authorization: `Bearer ${this.tokenService.getToken()}`,
                'Content-Type': 'application/json',
            },
            method: params.method,
            body: params?.body || {},
        };
    }

    public get$(url: string) {
        return ajax(this.getHeader({ url, method: 'GET' }));
    }

    public post$(url: string, body?: object) {
        return ajax(this.getHeader({ url, method: 'POST', body }));
    }

    public put$(url: string, body?: object) {
        return ajax(this.getHeader({ url, method: 'PUT', body }));
    }

    public delete$(url: string) {
        return ajax(this.getHeader({ url, method: 'DELETE' }));
    }
}
