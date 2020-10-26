import React from 'react';
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
        <header className={className}>
            <IconButton
                size="medium"
                onClick={() => { setState(!state); }}
            >
                <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <h4>{title}</h4>
        </header>
    );
};

Header.defaultProps = { className: '' };

export { Header };
