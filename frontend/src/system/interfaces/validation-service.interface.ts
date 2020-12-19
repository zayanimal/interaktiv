import { Observable } from 'rxjs';

export interface IValidationService {
    /**
     * Проверить сущность на ошибки валидатора
     * @param entity
     */
    check$<T>(entity: T): Observable<T>
}
