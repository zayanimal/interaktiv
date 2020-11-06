import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Component = React.FC | React.Component;

interface Props {
    path: string;
    component?: Component;
    permission: boolean;
}

export const PrivateRoute: React.FC<Props> = (props) => {
    const {
        children,
        path,
        component,
        permission = false
    } = props;

    return (
        <Route
            path={path}
            render={() => (
                permission
                    ? (children || component)
                    : (<Redirect to={{ pathname: '/auth' }} />)
            )}
        />
    );
};
