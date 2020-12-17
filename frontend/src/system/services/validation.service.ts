import { mapKeys, upperFirst } from 'lodash';
import { Observable, of, from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { validate, ValidationError } from 'class-validator';

export class ValidationService {
    /**
     * Проверить сущность на ошибки валидации
     * @param entity
     */
    public check$<T extends object>(entity: T): Observable<T> {
        return from(validate(entity)).pipe(
            mergeMap((msgs) => (msgs.length
                ? throwError(this.wrapKeys(this.parse(msgs)))
                : of(entity)
            )),
        );
    }

    /**
     * Проеобразовать массив сообщений в объект
     * @param messages сообщения об ошибке валидации
     * @param buffer буффер для сообщений
     */
    private parse(messages: ValidationError[], buffer = {}): object {
        return messages.reduce((acc, err) => (err.constraints
            ? this.push(acc, err)
            : Object.assign(acc, this.parse(err.children, buffer))
        ), buffer);
    }

    /**
     * Положить сообщение в буффер
     * @param buffer
     * @param err
     */
    private push(buffer: object, err: ValidationError): object {
        return Object.defineProperty(buffer, err.property, {
            value: this.buildMessage(err.constraints!),
            configurable: true,
            enumerable: true,
            writable: true,
        });
    }

    /**
     * Сформировать сообщение из списка
     * @param constraints сообщения
     */
    private buildMessage(constraints: object) {
        return Object
            .values(constraints)
            .reduce((msg, value) => msg.concat(value, '. '), '')
            .trim();
    }

    /**
     * Обернуть имена ключей в ошибочные
     * @param fields
     */
    private wrapKeys(fields: object) {
        return mapKeys(fields,
            (_, key) => `error${upperFirst(key)}`
        );
    }
}
