import React from 'react';
import { set } from 'local-storage';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Header.scss';

interface Props {
    state: boolean;
    title: string;
    setState: (v: boolean) => void;
}

const Header: React.SFC<Props> = props => {
    const { state, setState, title } = props;

    return (
        <div className="Header">
            <IconButton size="medium" onClick={() => {
                setState(!state);
                set('drawerState', !state);
            }}>
                <MoreVertIcon fontSize="inherit"/>
            </IconButton>
            <div className="Header__toolbar">
                {title}
            </div>
        </div>
    );
};

export { Header };
