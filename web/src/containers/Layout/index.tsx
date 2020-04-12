import React from 'react';
import { connect } from 'react-redux'
import * as actions from '@actions/system.actions';
import { rootStateTypes } from '@store/roots';
import Drawer from '@components/Drawer';
import Header from '@components/Header';

import './Layout.scss';

const mapStateToProps = (state: rootStateTypes) => ({
    drawerState: state.system.drawer
});

const mapDispatchToProps = {
    toggle: actions.toggleDrawer
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Layout: React.SFC<Props> = ({
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
