import React from 'react';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { bem, classes } from '@utils/formatters';
import './Header.scss';

const cn = bem('Header');

interface IHeader {
    className?: string;
    state: boolean;
    title: string;
    username?: string;
    setState: (v: boolean) => void;
    onLogOut: () => void;
}

const Header: React.FC<IHeader> = (props) => {
    const {
        className = '',
        state,
        title,
        username,
        setState,
        onLogOut
    } = props;

    return (
        <header className={classes(className, cn())}>
            <div>
                <IconButton
                    size="medium"
                    onClick={() => { setState(!state); }}
                >
                    <MoreVertIcon fontSize="inherit" />
                </IconButton>
                <h4>{title}</h4>
            </div>
            <div className={cn('user')}>
                <Chip
                    variant="outlined"
                    size="medium"
                    icon={<FaceIcon />}
                    label={username}
                />
                <IconButton
                    size="medium"
                    onClick={onLogOut}
                >
                    <ExitToAppIcon className={cn('icon')} />
                </IconButton>
            </div>
        </header>
    );
};

Header.defaultProps = { className: '', username: '' };

export { Header };
