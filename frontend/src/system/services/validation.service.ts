import { mapKeys, upperFirst } from 'lodash';
import { of, from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { validate, ValidationError } from 'class-validator';

export class ValidationService {
    /**
     * Проверить сущность на ошибки валидации
     * @param entity
     */
    public check$(entity: object) {
        return from(validate(entity)).pipe(
            mergeMap((msgs) => (msgs.length
                ? throwError(this.wrap(this.parse(msgs)))
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
     *
     * @param fields
     */
    private wrap(fields: object) {
        return mapKeys(fields,
            (_, key) => `error${upperFirst(key)}`
        );
    }

    /**
     * Положить сообщение в буффер
     * @param buffer
     * @param err
     */
    private push(buffer: object, err: ValidationError): object {
        return Object.defineProperty(buffer, err.property, {
            value: Object.values(err.constraints!)[0],
            configurable: true,
            enumerable: true,
            writable: true,
        });
    }
}
