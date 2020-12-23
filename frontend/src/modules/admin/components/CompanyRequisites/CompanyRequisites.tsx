import React from 'react';
import { Chip, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { bem } from '@utils/formatters';
import { CompanyControlProps } from '@admin/containers/CompanyControl'
import './CompanyRequisites.scss';

const cn = bem('CompanyRequisites');

const CompanyRequisites: React.FC<CompanyControlProps> = (props) => {
    const { requisites, setDrawer, setCurrentRequisites } = props;

    const onClick = (id: string) => () => {
        setDrawer(true);
        setCurrentRequisites(id);
    };

    return (
        <div className={cn()}>
            {requisites.map((req) => (
                <Chip
                    key={req.id}
                    label={req.name}
                    onClick={onClick(req.id)}
                    onDelete={() => {}}
                />
            ))}
            <IconButton onClick={() => {}} size="small">
                <Add />
            </IconButton>
        </div>
    );
};

export { CompanyRequisites };
