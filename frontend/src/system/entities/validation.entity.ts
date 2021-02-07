import uuid from 'uuid-random';
import { IsString } from 'class-validator';
import { ValidationErrors } from '@system/interfaces';

export class ValidationEntity {
    @IsString({ message: 'Id должно быть строкой' })
    id = uuid();

    validation: ValidationErrors = {};

    public setErrors(errors: ValidationErrors) {
        Object.assign(this.validation, errors);

        return this;
    }
}
