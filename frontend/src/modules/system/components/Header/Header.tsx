import React from 'react';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LayoutProps } from '@system/containers/Layout';
import { bem } from '@utils/formatters';
import './Header.scss';

const cn = bem('Header');

const Header: React.FC<LayoutProps> = (props) => {
    const {
        drawerState = false,
        headerTitle = '',
        username = '',
        setDrawerState = () => {},
        onLogOut = () => {}
    } = props;

    return (
        <header className={cn()}>
            <div>
                <IconButton
                    size='medium'
                    onClick={() => {
                        setDrawerState(!drawerState);
                    }}>
                    <MoreVertIcon fontSize='inherit' />
                </IconButton>
                <h4>{headerTitle}</h4>
            </div>
            <div className={cn('user')}>
                <Chip
                    variant='outlined'
                    size='medium'
                    icon={<FaceIcon />}
                    label={username}
                />
                <IconButton size='medium' onClick={onLogOut}>
                    <ExitToAppIcon className={cn('icon')} />
                </IconButton>
            </div>
        </header>
    );
};

export { Header };
