import React from 'react';
import Drawer from '@components/Drawer';
import Header from '@components/Header';

import './Layout.scss';

const Layout: React.SFC = ({ children }) => (
    <div className="Layout">
        <Drawer/>
        <div className="Layout__workspace">
            <Header/>
            <div className="Layout__main">
                {children}
            </div>
        </div>
    </div>
);

export default Layout;
