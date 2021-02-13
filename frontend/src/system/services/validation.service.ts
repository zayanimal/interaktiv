import { transform, set, isObject, isArray, merge } from 'lodash';
import { of, from, throwError } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { validate, ValidationError } from 'class-validator';
import { IValidationService } from '@system/interfaces';
import { ValidationEntity } from '@system/entities';

export class ValidationService implements IValidationService {
    private entity = {};

    /**
     * Проверить сущность на ошибки валидации
     * @param entity
     */
    public check$<T>(entity: T) {
        this.entity = this.flatEntity(entity);

        return from(validate(entity)).pipe(
            mergeMap((msgs) =>
                msgs.length ? throwError(this.parse(msgs)) : of(entity)
            )
        );
    }

    /**
     * Проверить сущности на ошибки валидации
     *
     * TODO: сделать whitelist для свойства validation
     * для случая если нет ошибок валидации
     *
     * @param entities
     */
    public checkEntities$<T>(entities: T) {
        return from(
            validate(entities, { validationError: { value: false } })
        ).pipe(
            map((errors) => this.transformError(errors)),
            map(() => entities)
        );
    }

    /**
     * Сохранение ошибок валидации в сущностях
     * @param errors ошибки валидации
     */
    private transformError(errors: ValidationError[]) {
        errors.forEach((err) => {
            if (err.constraints && err.target instanceof ValidationEntity) {
                err.target.setErrors({
                    [err.property]: this.buildMessage(err.constraints)
                });
            } else {
                return this.transformError(err.children);
            }

            return null;
        });
    }

    /**
     * Проеобразовать массив сообщений в объект
     * @param messages сообщения об ошибке валидации
     * @param buffer буффер для сообщений
     */
    private parse(messages: ValidationError[], buffer = {}): object {
        return messages.reduce((acc, err) => {
            if (err.constraints) {
                return set(
                    buffer,
                    err.property,
                    this.buildMessage(err.constraints)
                );
            }

            return merge(acc, this.parse(err.children, buffer));
        }, buffer);
    }

    /**
     * Сформировать сообщение из списка
     * @param constraints сообщения
     */
    private buildMessage(constraints: Record<string, string>) {
        return Object.values(constraints)
            .reduce((msg, value) => msg.concat(value, '. '), '')
            .trim();
    }

    /**
     * Извлечь вложенные объекты сущности
     * @param entity
     */
    private flatEntity(entity = {}): object {
        return transform(
            entity,
            (acc, value, key) =>
                isObject(value) && !isArray(value)
                    ? merge(acc, this.flatEntity(value))
                    : set(acc, key, value),
            this.entity
        );
    }
}
