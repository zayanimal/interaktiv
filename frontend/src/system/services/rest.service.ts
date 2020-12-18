import { ajax } from 'rxjs/ajax';
import { TokenService } from '@system/services/token.service';
import { IRestService, IHeader } from '@system/interfaces';
import { ApiUrl } from '@system/decorators';

@ApiUrl('http://interaktiv:8000/')
export class RestService implements IRestService {
    constructor(private tokenService: TokenService) {}

    url = '';

    public getHeader(params: IHeader) {
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

    public get$(url: string) {
        return ajax(this.getHeader({ url, method: 'GET' }));
    }

    public post$(url: string, body?: object) {
        return ajax(
            this.getHeader({
                url,
                method: 'POST',
                body: body || {},
            }),
        );
    }

    public put$(url: string, body?: object) {
        return ajax(
            this.getHeader({
                url,
                method: 'PUT',
                body: body || {},
            }),
        );
    }

    public delete$(url: string) {
        return ajax(this.getHeader({ url, method: 'DELETE' }));
    }
}
