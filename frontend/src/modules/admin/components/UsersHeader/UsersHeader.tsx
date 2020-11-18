import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { bem } from '@utils/formatters';
import './UsersHeader.scss';

const cn = bem('UsersHeader');

interface Props {

}

const UsersHeader: React.FC<Props> = () => {
    // const {} = props;

    const { path } = useRouteMatch();
    const history = useHistory();

    const onAdd = () => {
        history.push({ pathname: `${path}/add` });
    };

    return (
        <div className={cn()}>
            <IconButton size="medium" onClick={onAdd}>
                <AddIcon />
            </IconButton>
        </div>
    );
};

export { UsersHeader };
