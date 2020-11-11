import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
    path: string;
    exact?: boolean;
    permission: boolean;
}

export const PrivateRoute: React.FC<Props> = (props) => {
    const {
        children,
        path,
        exact = false,
        permission = false
    } = props;

    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) => (
                permission
                    ? children
                    : (
                        <Redirect
                            to={{
                                pathname: '/auth',
                                state: { from: location }
                            }}
                        />
                    )
            )}
        />
    );
};
