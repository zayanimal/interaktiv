import React from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import { bem } from '@utils/formatters';
import './RequisitesFields.scss';

const cn = bem('RequisitesFields');

interface Props {

}

const RequisitesFields: React.FC<Props> = (props) => {
    // const {} = props;

    return (
        <>
            <InputLabel>Название</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>ИНН</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>КПП</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>ОГРН</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>Юридический адрес</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>Почтовый адрес</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>Генеральный директор</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
        </>
    );
};

export { RequisitesFields };
