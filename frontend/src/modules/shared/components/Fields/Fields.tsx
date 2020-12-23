import React, { memo, ChangeEvent } from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import { bem, classes } from '@utils/formatters';
import './Fields.scss';

const cn = bem('Fields');

export interface Field {
    label: string;
    name: string;
    type?: string;
    class?: string;
    labelClass?: string;
    error?: string;
}

interface Props {
    fields: Field[];
    entity: { [key: string]: string; };
    handler: (obj: object) => void;
}

const Fields: React.FC<Props> = memo((props) => {
    const { fields, entity, handler } = props;

    const onChange = (event: ChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement;
        handler({ [name]: value });
    };

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
                        error={!!field?.error}
                        helperText={field?.error || ''}
                        type={field?.type || 'text'}
                        value={entity[field.name]}
                        onChange={onChange}
                    />
                </div>
            ))}
        </>
    );
});

export { Fields };
