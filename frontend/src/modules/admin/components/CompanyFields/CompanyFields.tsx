import React from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import { bem } from '@utils/formatters';
import { CompanyControlProps } from '@admin/containers/CompanyControl';

const grid = bem('FlexGrid');

const CompanyFields: React.FC<CompanyControlProps> = (props) => {
    const { name, email, phone, website } = props;

    return (
        <>
            <InputLabel>Название компании</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={name}
                onChange={() => {}}
            />
            <InputLabel>Почта</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={email}
                onChange={() => {}}
            />
            <InputLabel>Телефон</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={phone}
                onChange={() => {}}
            />
            <InputLabel>Сайт</InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={grid('input')}
                type="text"
                value={website}
                onChange={() => {}}
            />
        </>
    );
};

export { CompanyFields };
