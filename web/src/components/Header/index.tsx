import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import './Header.scss';

const Header: React.SFC = () => (
    <div className="Header">
        <IconButton size="medium">
            <KeyboardBackspaceIcon fontSize="inherit"/>
        </IconButton>
        <div className="Header__toolbar">
            Текущие проекты
        </div>
    </div>
);

export default Header;
