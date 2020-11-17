import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { bem } from '@utils/formatters';
import './UsersHeader.scss';

const cn = bem('UsersHeader');

interface Props {

}

const UsersHeader: React.FC<Props> = () => {
    // const {} = props;
    console.log('hgb');

    return (
        <div className={cn()}>
            <IconButton size="medium">
                <AddIcon />
            </IconButton>
        </div>
    );
};

export { UsersHeader };
