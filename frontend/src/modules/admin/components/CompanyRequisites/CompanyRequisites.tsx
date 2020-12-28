import React from 'react';
import { Chip, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { bem } from '@utils/formatters';
import { CompanyControlProps } from '@admin/containers/CompanyControl'
import './CompanyRequisites.scss';

const cn = bem('CompanyRequisites');

const CompanyRequisites: React.FC<CompanyControlProps> = (props) => {
    const {
        requisites,
        updateCurrentRequisites,
        deleteRequisitesFrom,
        createRequisitesFrom,
    } = props;

    const onClick = (id: string) => () => {
        updateCurrentRequisites(id);
    };

    const onDelete = (id: string) => () => {
        deleteRequisitesFrom(id);
    };

    return (
        <div className={cn()}>
            {requisites.map((req) => (
                <Chip
                    key={req.id}
                    className={cn('chip')}
                    color="secondary"
                    label={req.name}
                    onClick={onClick(req.id)}
                    onDelete={onDelete(req.id)}
                />
            ))}
            <IconButton onClick={createRequisitesFrom} size="small">
                <Add />
            </IconButton>
        </div>
    );
};

export { CompanyRequisites };
