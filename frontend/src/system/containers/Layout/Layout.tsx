import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { systemActions } from '@system/store/actions';
import { rootStateTypes } from '@system/store/roots';
import { Drawer } from '@system/components/Drawer';
import { Header } from '@system/components/Header';
import { Notification } from '@system/components/Notification';
import { RequestsList } from '@customer/containers/RequestsList';
import { Request } from '@customer/containers/Request';
import { systemSelectors } from '@system/store/selectors';
import { bem } from '@utils/formatters';
import './Layout.scss';

const cn = bem('Layout');

const mapStateToProps = (state: rootStateTypes) => ({
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
    onLogOut: systemActions.logOut
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Layout: React.FC<Props> = (props) => {
    const {
        username,
        drawerState,
        headerTitle,
        setDrawerState,
        typeNotification,
        messageNotification,
        openNotification,
        closeNotification,
        onLogOut
    } = props;

    return (
        <div className={cn('container')}>
            <Drawer
                toggle={drawerState}
            />
            <div className={cn('content')}>
                <Header
                    className={cn('header')}
                    state={drawerState}
                    title={headerTitle}
                    username={username}
                    setState={setDrawerState}
                    onLogOut={onLogOut}
                />
                <main className={cn('main')}>
                    <Switch>
                        <Route path="/projects" component={RequestsList} />
                        <Route path="/new-project" component={Request} />
                    </Switch>
                </main>
            </div>

            <Notification
                type={typeNotification}
                message={messageNotification}
                open={openNotification}
                onClose={closeNotification}
            />
        </div>
    );
};

const LayoutConnected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export { LayoutConnected as Layout };
