import React from 'react';
import { connect } from 'react-redux'
import * as systemActions from '@actions/system.actions';
import { rootState } from '@store/roots';
import Drawer from '@components/Drawer';
import Header from '@components/Header';

import './Layout.scss';

const mapStateToProps = (state: rootState) => ({
    drawerState: state.system.drawer
});

const mapDispatchToProps = {
    toggle: systemActions.toggleDrawer
};

type LayoutProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
export type HeaderProps = typeof mapDispatchToProps;

const Layout: React.SFC<LayoutProps> = ({
    children,
    toggle,
    drawerState }) => (
    <div className="Layout">
        <Drawer toggle={drawerState} />
        <div className="Layout__workspace">
            <Header toggle={toggle} />
            <div className="Layout__main">
                {children}
            </div>
        </div>
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
