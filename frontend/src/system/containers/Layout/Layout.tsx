import React, { createContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { systemActions } from '@system/store/actions';
import { rootStateTypes } from '@system/store/roots';
import { Drawer } from '@system/components/Drawer';
import { Header } from '@system/components/Header';
import { Main } from '@system/components/Main';
import { Auth } from '@system/components/Auth';
import { Notification } from '@system/components/Notification';
import { systemSelectors } from '@system/store/selectors';
import { bem } from '@utils/formatters';
import './Layout.scss';

const cn = bem('Layout');

const mapStateToProps = (state: rootStateTypes) => ({
    isLoggedIn: systemSelectors.isLoggedIn(state),
    drawerState: systemSelectors.drawer(state),
    headerTitle: systemSelectors.headerTitle(state),
    typeNotification: systemSelectors.typeNotification(state),
    messageNotification: systemSelectors.messageNotification(state),
    openNotification: systemSelectors.openNotification(state),
    username: systemSelectors.username(state)
});

const mapDispatchToProps = {
    setDrawerState: systemActions.setDrawerState,
    closeNotification: systemActions.closeNotification,
    checkAuth: systemActions.checkAuth,
    onLogOut: systemActions.logOut
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const LayoutContext = createContext<Partial<Props>>({});

const Layout: React.FC<Props> = (props) => {
    const { isLoggedIn, checkAuth } = props;

    useEffect(() => {
        checkAuth();
    });

    return (
        <div className={cn('container')}>
            <LayoutContext.Provider value={props}>
                {isLoggedIn && <Drawer />}

                <div className={cn('content')}>
                    {isLoggedIn && <Header />}

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
                                isLoggedIn ? <Main /> : <Redirect to={{ pathname: '/auth' }} />
                            )}
                        />
                    </Switch>
                </div>

                <Notification />
            </LayoutContext.Provider>
        </div>
    );
};

const LayoutConnected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export { LayoutConnected as Layout };
