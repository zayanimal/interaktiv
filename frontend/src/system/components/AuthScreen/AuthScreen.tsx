import React, { ChangeEvent } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { Location } from '@system/interfaces/location.interface';
import { AuthProps } from '@system/containers/Auth';
import { bem } from '@utils/formatters';
import './AuthScreen.scss';

const cn = bem('AuthScreen');

const AuthScreen: React.FC<AuthProps> = (props) => {
    const {
        username,
        password,
        setLogin,
        isLoggedIn,
        setPassword,
        getCredentials,
    } = props;

    const location: Location = useLocation();
    const { pathname } = location?.state?.from || { pathname: '/' };

    const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    if (isLoggedIn) {
        return <Redirect to={{ pathname }} />;
    }

    return (
        <div className={cn()}>
            <form className={cn('form')}>
                <h3>ISKOR Interaktiv</h3>
                <TextField
                    value={username}
                    onChange={onChangeLogin}
                    label="Логин"
                    size="small"
                    variant="outlined"
                />
                <TextField
                    value={password}
                    onChange={onChangePassword}
                    label="Пароль"
                    size="small"
                    variant="outlined"
                    type="password"
                />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={getCredentials}
                >
                    Войти
                </Button>
            </form>
        </div>
    );
};

export { AuthScreen };
