import React from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { systemActions } from '@system/store/actions';
import { rootStateTypes } from '@system/store/roots';
import { Drawer } from '@system/components/Drawer';
import { Header } from '@system/components/Header';
import { RequestsList } from '@customer/containers/RequestsList';
import { Request } from '@customer/containers/Request';
import { systemSelectors } from '@system/store/selectors';
import './Layout.scss';

const mapStateToProps = (state: rootStateTypes) => ({
    drawerState: systemSelectors.drawer(state),
    headerTitle: systemSelectors.headerTitle(state)
});

const mapDispatchToProps = {
    toggle: systemActions.toggleDrawer,
    setHeaderTitle: systemActions.setHeaderTitle
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Layout: React.SFC<Props> = props => {
    const {
        drawerState,
        toggle,
        headerTitle,
        setHeaderTitle,
    } = props;

    return (
        <div className="Layout">
            <Drawer toggle={drawerState} />
            <div className="Layout__workspace">
                <Header toggle={toggle} title={headerTitle} />
                <div className="Layout__main">
                    <Switch>
                        <Route path={'/projects'}>
                            <RequestsList setHeaderTitle={setHeaderTitle} />
                        </Route>
                        <Route path={'/new-project'} component={Request}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

const LayoutConnected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export { LayoutConnected as Layout };
