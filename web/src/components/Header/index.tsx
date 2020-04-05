import * as React from 'react';
import { HeaderProps } from '@views/Layout';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import './Header.scss';

const Header: React.SFC<HeaderProps> = ({ toggle }) => (
    <div className="Header">
        <IconButton size="medium" onClick={toggle}>
            <KeyboardBackspaceIcon fontSize="inherit"/>
        </IconButton>
        <div className="Header__toolbar">
            Текущие проекты
        </div>
    </div>
);

export default Header;
