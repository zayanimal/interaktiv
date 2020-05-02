import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { toggleDrawerType } from 'system/store/actions/system.actions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Header.scss';

interface Props {
    toggle: toggleDrawerType;
    title: string;
}

const Header: React.SFC<Props> = props => {
    const { toggle, title } = props;

    return (
        <div className="Header">
            <IconButton size="medium" onClick={toggle}>
                <MoreVertIcon fontSize="inherit"/>
            </IconButton>
            <div className="Header__toolbar">
                {title}
            </div>
        </div>
    );
};

export { Header };
