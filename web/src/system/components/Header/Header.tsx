import React from 'react';
import { set } from 'local-storage';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Props {
    className: string;
    state: boolean;
    title: string;
    setState: (v: boolean) => void;
}

const Header: React.SFC<Props> = (props) => {
    const {
        className, state, setState, title
    } = props;

    return (
        <div className={className}>
            <IconButton
                size="medium"
                onClick={() => {
                    setState(!state);
                    set('drawerState', !state);
                }}
            >
                <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <h4>{title}</h4>
        </div>
    );
};

Header.defaultProps = { className: '' };

export { Header };
