import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { systemActions } from '@system/store/actions';
import { RootStateTypes } from '@config/roots';
import { Main } from '@system/components/Main';
import { Auth } from '@system/containers/Auth';
import { Notification } from '@system/components/Notification';
import { systemSelectors } from '@system/store/selectors';
import { bem } from '@utils/formatters';
import './Layout.scss';

const cn = bem('Layout');

const mapStateToProps = (state: RootStateTypes) => ({
    authFetched: systemSelectors.authFetched(state),
    isLoggedIn: systemSelectors.isLoggedIn(state),
    drawerState: systemSelectors.drawer(state),
    routerItems: systemSelectors.routerItems(state),
    headerTitle: systemSelectors.headerTitle(state),
    typeNotification: systemSelectors.typeNotification(state),
    messageNotification: systemSelectors.messageNotification(state),
    openNotification: systemSelectors.openNotification(state),
    username: systemSelectors.username(state)
});

const mapDispatchToProps = {
    setDrawerState: systemActions.setLsDrawerState,
    getDrawerState: systemActions.getDrawerState,
    getRouterItems: systemActions.getRouterItems,
    closeNotification: systemActions.closeNotification,
    checkAuth: systemActions.checkAuth,
    onLogOut: systemActions.logOut
};

export type LayoutProps = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps;

const Layout: React.FC<LayoutProps> = (props) => {
    const { checkAuth, getDrawerState } = props;

    useLayoutEffect(() => {
        checkAuth();
        getDrawerState();
    }, [checkAuth, getDrawerState]);

    return (
        <div className={cn('container')}>
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route render={() => <Main {...props} />} />
            </Switch>

            <Notification {...props} />
        </div>
    );
};

const LayoutConnected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export { LayoutConnected as Layout };
