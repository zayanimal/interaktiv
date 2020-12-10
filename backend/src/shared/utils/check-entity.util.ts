import { Observable, of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

type EntityObservable<T> = Observable<NonNullable<T>>;

/**
 * Функция проверки сущности на присутствие в базе
 * @param errorMessage
 * @return функция для проверки сущности
 */
export function checkEntity<T>(errorMessage: string) {
    return function (entity: T): EntityObservable<T> {
        return (entity ? (of(entity) as EntityObservable<T>) : throwError(
            new NotFoundException(errorMessage)
        ));
    }
};
