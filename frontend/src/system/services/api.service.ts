import { ajax } from 'rxjs/ajax';
import { tokenService } from '@system/services/token.service';
import { IHeader } from '@system/interfaces/header.interface';

export class ApiService {
    constructor(private readonly url: string) {}

    private getHeader(params: IHeader) {
        return {
            url: this.url + params.url,
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`,
                'Content-Type': 'application/json'
            },
            method: params.method,
            body: params.body
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
                body: body || {}
            })
        );
    }

    put$(url: string, body: object) {
        return ajax(
            this.getHeader({
                url,
                method: 'PUT',
                body: body || {}
            })
        );
    }

    delete$(url: string, body: object) {
        return ajax(
            this.getHeader({
                url,
                method: 'DELETE',
                body: body || {}
            })
        );
    }
}


export const apiService = new ApiService('http://interaktiv:8000/');
