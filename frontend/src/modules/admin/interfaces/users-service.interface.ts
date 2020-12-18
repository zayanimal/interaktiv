import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { INewUser } from '@admin/interfaces';

export interface IUsersService {
    /**
     * Получить список пользователей (пагинация)
     * @param page
     */
    getList$(page: number): Observable<AjaxResponse>;

    /**
     * Добавить нового пользователя
     * @param dto
     */
    add$(dto: INewUser): Observable<AjaxResponse>;

    /**
     * Найти пользователя по имени
     * @param username
     */
    find$(username: string): Observable<AjaxResponse>;

    /**
     * Обновить пользователя по имени
     * @param username
     * @param dto
     */
    update$(username: string, dto: INewUser): Observable<AjaxResponse>;

    /**
     * Удалить пользователя по имени
     * @param username
     */
    delete$(username: string): Observable<AjaxResponse>;
}
