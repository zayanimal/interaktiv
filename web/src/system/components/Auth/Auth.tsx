import React from 'react';
import { TextField, Button } from '@material-ui/core';

const Auth: React.FC = () => (
    <div className="auth">
        <form className="auth__form">
            <h3>ISKOR Interaktiv</h3>
            <TextField label="Логин" size="small" variant="outlined"/>
            <TextField label="Пароль" size="small" variant="outlined"/>
            <Button variant="outlined" color="primary">Войти</Button>
        </form>
    </div>
);

export { Auth };
