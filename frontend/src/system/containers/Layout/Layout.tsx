import React, { createContext, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Switch, Route, useHistory, useLocation
} from 'react-router-dom';
import { Location } from '@system/interfaces/location.interface';
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
    authFetched: systemSelectors.authFetched(state),
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
    const { isLoggedIn } = props;
    // const history = useHistory();
    // // const location: Location = useLocation();
    // // const { from } = location?.state || { from: { pathname: '/' } };

    // useEffect(() => {
    //     if (!authFetched) { checkAuth(); }

    //     if (authFetched && isLoggedIn) {
    //         history.push('/projects');
    //     } else if (authFetched) {
    //         history.push('/auth');
    //     }
    // }, [checkAuth, authFetched, isLoggedIn, history]); // eslint-disable-line

    return (
        <div className={cn('container')}>
            <LayoutContext.Provider value={props}>
                {isLoggedIn && <Drawer />}

                <div className={cn('content')}>
                    {isLoggedIn && <Header />}

                    <Switch>
                        <Route path="/auth" component={Auth} />
                        <Route path="/" component={Main} />
                    </Switch>
                </div>

                <Notification />
            </LayoutContext.Provider>
        </div>
    );
};

const LayoutConnected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export { LayoutConnected as Layout };
