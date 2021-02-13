import { Observable } from 'rxjs';

export interface IValidationService {
    /**
     * Проверить сущность на ошибки валидатора
     * @param entity
     */
    check$<T>(entity: T): Observable<T>;

    /**
     * Проверить сущности на ошибки валидации
     * @param entities
     */
    checkEntities$<T>(entities: T): Observable<T>;
}
