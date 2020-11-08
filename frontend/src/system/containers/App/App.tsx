import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import { rootStateTypes } from '@system/store/roots';
import { Layout } from '@system/containers/Layout';
import { Auth } from '@system/components/Auth';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';


const mapStateToProps = (state: rootStateTypes) => ({
    isLoggedIn: systemSelectors.isLoggedIn(state)
});

const mapDispatchToProps = {
    checkAuth: systemActions.checkAuth
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App: React.FC<Props> = (props) => {
    const { checkAuth, isLoggedIn } = props;

    useEffect(() => {
        checkAuth();
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/auth"
                    render={() => (
                        isLoggedIn ? <Redirect to={{ pathname: '/' }} /> : <Auth />
                    )}
                />

                <Route
                    path="/"
                    render={() => (
                        isLoggedIn ? <Layout /> : <Redirect to={{ pathname: '/auth' }} />
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
};

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export { AppConnected as App };
