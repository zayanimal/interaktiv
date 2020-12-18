import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { IHeader } from '@system/interfaces';

export interface IRestService {
    url: string;

    /**
     * Получить заголовок для запроса
     * @param params
     */
    getHeader(params: IHeader): object;

    /**
     * Гет запрос
     * @param url
     */
    get$(url: string): Observable<AjaxResponse>;

    /**
     * Пост запрос
     * @param url
     * @param body
     */
    post$(url: string, body?: object): Observable<AjaxResponse>;

    /**
     * Пут запрос
     * @param url
     * @param body
     */
    put$(url: string, body?: object): Observable<AjaxResponse>;

    /**
     * Делит запрос
     * @param url
     */
    delete$(url: string): Observable<AjaxResponse>;
}
