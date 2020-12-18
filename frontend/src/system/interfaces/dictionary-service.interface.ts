import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { DictionaryPayload } from '@system/interfaces';

export interface IDictionaryService {
    /**
     * Получить словарь по заданным параметрам
     * @param params
     */
    get$(params: DictionaryPayload): Observable<AjaxResponse>
}
