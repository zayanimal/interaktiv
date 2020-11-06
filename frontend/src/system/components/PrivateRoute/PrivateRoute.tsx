import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Component = React.FC | React.Component;

interface Props {
    path: string;
    endPath: string;
    exact?: boolean;
    component?: Component;
    permission: boolean;
}

export const PrivateRoute: React.FC<Props> = (props) => {
    const {
        children,
        path,
        endPath = '/',
        exact = false,
        component,
        permission = false
    } = props;

    return (
        <Route
            exact={exact}
            path={path}
            render={() => (
                permission
                    ? (component || children)
                    : (<Redirect to={{ pathname: endPath }} />)
            )}
        />
    );
};
