import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Location } from '@system/interfaces/location.interface';
import { AuthProps } from '@system/containers/Auth';
import { AuthForm } from '@system/components/AuthForm';

const AuthScreen: React.FC<AuthProps> = (props) => {
    const { isLoggedIn } = props;

    const location: Location = useLocation();
    const { pathname } = location?.state?.from || { pathname: '/' };


    if (isLoggedIn) {
        return <Redirect to={{ pathname }} />;
    }

    return <AuthForm {...props} />;
};

export { AuthScreen };
