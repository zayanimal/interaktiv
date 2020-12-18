import { transform, set, get, isObject, isArray, upperFirst, merge } from 'lodash';
import { Observable, of, from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { validate, ValidationError } from 'class-validator';
import { ValidationErrors } from '@system/interfaces/validation-errors.interface';

export class ValidationService {
    private entity = {};

    /**
     * Проверить сущность на ошибки валидации
     * @param entity
     */
    public check$<T>(entity: T): Observable<T> {
        this.entity = this.flatEntity(entity);

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
            ? set(buffer, err.property, this.buildMessage(err.constraints!))
            : merge(acc, this.parse(err.children, buffer))
        ), buffer);
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
    private wrapKeys(errors: object): ValidationErrors {
        return transform(this.entity, (acc, _, key) => set(
            acc,
            `error${upperFirst(key)}`,
            get(errors, key, '')
        ), {});
    }

    /**
     * Извлечь вложенные объекты сущности
     * @param entity
     */
    private flatEntity(entity = {}): object {
        return transform(entity, (acc, value, key) => (
            isObject(value) && !isArray(value)
                ? merge(acc, this.flatEntity(value))
                : set(acc, key, value)
        ), this.entity);
    }
}
