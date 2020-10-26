import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { bem } from '@utils/formatters';
import './Auth.scss';

const cn = bem('Auth');

const Auth: React.FC = () => (
    <div className={cn()}>
        <form className={cn('form')}>
            <h3>ISKOR Interaktiv</h3>
            <TextField label="Логин" size="small" variant="outlined" />
            <TextField label="Пароль" size="small" variant="outlined" />
            <Button variant="outlined" color="primary">Войти</Button>
        </form>
    </div>
);

export { Auth };
