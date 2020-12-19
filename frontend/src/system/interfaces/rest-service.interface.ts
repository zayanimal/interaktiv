import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

export interface IRestService {
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
