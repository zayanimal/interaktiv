import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { get } from 'local-storage';
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
    openNotification: systemSelectors.openNotification(state)
});

const mapDispatchToProps = {
    setDrawerState: systemActions.setDrawerState,
    closeNotification: systemActions.closeNotification
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Layout: React.SFC<Props> = (props) => {
    const {
        drawerState,
        headerTitle,
        setDrawerState,
        typeNotification,
        messageNotification,
        openNotification,
        closeNotification
    } = props;

    // TODO: решить баг нажатия кнопки хедера
    const lsDrawerState: boolean | null = get('drawerState');

    return (
        <div className="Layout">
            <Drawer toggle={lsDrawerState !== null ? lsDrawerState : drawerState} />
            <div className={cn('main')}>
                <Header
                    className={cn('header')}
                    state={drawerState}
                    setState={setDrawerState}
                    title={headerTitle}
                />
                <Switch>
                    <Route path="/projects" component={RequestsList} />
                    <Route path="/new-project" component={Request} />
                </Switch>
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
