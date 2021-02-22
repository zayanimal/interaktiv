import uuid from 'uuid-random';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ValidationErrors } from '@shared/interfaces';

export class ValidationEntity {
    @IsString({ message: 'Id должно быть строкой' })
    id = uuid();

    @Exclude()
    validation: ValidationErrors = {};

    /**
     * Проставить ошибки валидации в сущностях
     * @param errors ошибки валидатора
     */
    public setErrors(errors: ValidationErrors) {
        Object.assign(this.validation, errors);

        return this;
    }
}
