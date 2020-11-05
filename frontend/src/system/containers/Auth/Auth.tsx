import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { rootStateTypes } from '@system/store/roots';
import { TextField, Button } from '@material-ui/core';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';
import { bem } from '@utils/formatters';
import './Auth.scss';

const cn = bem('Auth');

const mapStateToProps = (state: rootStateTypes) => ({
    login: systemSelectors.login(state),
    password: systemSelectors.password(state)
});

const mapDispatchToProps = {
    setLogin: systemActions.setLogin,
    setPassword: systemActions.setPassword,
    getCredentials: systemActions.getCredentials
};

type AuthProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Auth: React.FC<AuthProps> = (props) => {
    const {
        login,
        password,
        setLogin,
        setPassword,
        getCredentials
    } = props;

    const onChangeLogin = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;

        setLogin(target.value);
    };

    const onChangePassword = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;

        setPassword(target.value);
    };


    return (
        <div className={cn()}>
            <form className={cn('form')}>
                <h3>ISKOR Interaktiv</h3>
                <TextField
                    value={login}
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

const AuthConnected = connect(mapStateToProps, mapDispatchToProps)(Auth);

export { AuthConnected as Auth };
