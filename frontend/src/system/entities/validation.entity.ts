import { ValidationErrors } from '@system/interfaces';

export class ValidationEntity {
    validation: ValidationErrors = {};

    public setErrors(errors: ValidationErrors) {
        this.validation = errors;

        return this;
    }
}
