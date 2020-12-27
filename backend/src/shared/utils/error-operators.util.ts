import { of, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InternalServerErrorException } from '@nestjs/common';

/**
 * Кастомный оператор обработки серверных ошибок
 * @param message
 */
export function catchServerError<T>(message?: string) {
    return catchError<T, ObservableInput<any>>(
        (err: any) => of(new InternalServerErrorException(message || err?.message))
    );
}
