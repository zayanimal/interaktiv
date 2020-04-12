import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { systemActionsTypes } from '@store/actions/system.actions';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './Header.scss';

const Header: React.SFC<systemActionsTypes> = ({ toggle }) => (
    <div className="Header">
        <IconButton size="medium" onClick={toggle}>
            <MoreVertIcon fontSize="inherit"/>
        </IconButton>
        <div className="Header__toolbar">
            Текущие проекты
        </div>
    </div>
);

export default Header;
