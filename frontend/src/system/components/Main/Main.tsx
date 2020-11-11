import React, { useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { RequestsList } from '@customer/containers/RequestsList';
import { Request } from '@customer/containers/Request';
import { LayoutContext } from '@system/containers/Layout';
import { bem } from '@utils/formatters';
import './Main.scss';

const cn = bem('Main');

export const Main: React.FC = () => {
    const { checkAuth, authFetched, isLoggedIn } = useContext(LayoutContext);

    const history = useHistory();

    useEffect(() => {
        if (!authFetched && checkAuth) { checkAuth(); }
        if (isLoggedIn) {
            history.push('/');
        } else {
            history.push('/auth');
        }
    }, [checkAuth, authFetched, history, isLoggedIn]);

    return (
        <main className={cn()}>
            <Switch>
                <Route path="/projects" component={RequestsList} />
                <Route path="/new-project" component={Request} />
            </Switch>
        </main>
    );
};
