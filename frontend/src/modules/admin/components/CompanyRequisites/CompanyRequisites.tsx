import React from 'react';
import { Chip, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { bem } from '@utils/formatters';
import './CompanyRequisites.scss';

const cn = bem('CompanyRequisites');

interface Props {

}

const CompanyRequisites: React.FC<Props> = (props) => {
    // const {} = props;

    return (
        <div className={cn()}>
            <Chip
                label="Моя компания"
                onDelete={() => {}}
            />

            <IconButton size="small">
                <Add />
            </IconButton>
        </div>
    );
};

export { CompanyRequisites };
