import React from 'react';
import { connect } from 'react-redux'
import * as actions from '@system/store/actions/system.actions';
import { rootStateTypes } from '@system/store/roots';
import { Drawer } from '@system/components/Drawer';
import { Header } from '@system/components/Header';
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

const LayoutConnected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export { LayoutConnected as Layout };
