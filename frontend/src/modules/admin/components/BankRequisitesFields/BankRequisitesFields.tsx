import React from 'react';
import { IconButton, InputLabel, TextField } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
// import { Fields } from '@shared/components/Fields';
import { bem } from '@utils/formatters';
import { CompanyControlProps } from '@admin/containers/CompanyControl';
import './BankRequisitesFields.scss';

const cn = bem('BankRequisitesFields');

const BankRequisitesFields: React.FC<CompanyControlProps> = (props) => {
    // const {

    // } = props;

    return (
        <div className={cn()}>
            <IconButton size="small" className={cn('button')}>
                <Clear className={cn('icon')} />
            </IconButton>
            <InputLabel className={cn('label')}>
                Название
            </InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel className={cn('label')}>
                Расчётный счёт
            </InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel className={cn('label')}>
                Корреспондентский счёт
            </InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel className={cn('label')}>
                БИК
            </InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
            <InputLabel className={cn('label')}>
                Адрес
            </InputLabel>
            <TextField
                error={false}
                helperText={''}
                className={cn('input')}
                type="text"
                value={''}
                onChange={() => {}}
            />
        </div>
    );
};

export { BankRequisitesFields };
