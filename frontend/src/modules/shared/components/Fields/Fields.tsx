import React, { memo, ChangeEvent } from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import { memoize, get } from 'lodash';
import { bem, classes } from '@utils/formatters';
import { ValidationErrors } from '@system/interfaces';
import './Fields.scss';

const cn = bem('Fields');
export interface Field {
    label: string;
    name: string;
    type?: string;
    class?: string;
    labelClass?: string;
}

type EntityProp = string | string[] | ValidationErrors;

interface Props {
    fields: Field[];
    entity: { [key: string]: EntityProp };
    // eslint-disable-next-line @typescript-eslint/ban-types
    handler: (obj: object) => void;
}

const Fields: React.FC<Props> = memo((props) => {
    const { fields, entity, handler } = props;

    const onChange = (event: ChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement;

        handler({ id: entity.id, [name]: value });
    };

    const getError = memoize((field: string) =>
        get(entity, `validation.${field}`, '')
    );

    return (
        <>
            {fields.map((field) => (
                <div key={field.name} className={field?.class || cn()}>
                    <InputLabel className={classes(field?.labelClass)}>
                        {field.label}
                    </InputLabel>
                    <TextField
                        fullWidth
                        name={field.name}
                        error={!!getError(field.name)}
                        helperText={getError(field.name)}
                        type={field?.type || 'text'}
                        value={get(entity, field.name)}
                        onChange={onChange}
                    />
                </div>
            ))}
        </>
    );
});

export { Fields };
