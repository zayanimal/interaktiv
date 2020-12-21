import React from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import { bem } from '@utils/formatters';

const grid = bem('FlexGrid');

interface Props {

}

const CompanyFields: React.FC<Props> = (props) => {
    // const {} = props;

    return (
        <>
            <InputLabel>Название компании</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>Почта</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>Телефон</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel>Сайт</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
        </>
    );
};

export { CompanyFields };
