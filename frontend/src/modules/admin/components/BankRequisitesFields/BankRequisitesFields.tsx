import React from 'react';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Fields } from '@shared/components/Fields';
import { bem } from '@utils/formatters';
import { BANK_FIELDS } from '@admin/constants';
import { CompanyControlProps } from '@admin/containers/CompanyControl';
import './BankRequisitesFields.scss';

const cn = bem('BankRequisitesFields');

const BankRequisitesFields: React.FC<CompanyControlProps> = (props) => {
    const { bankRequisites, updateBankForm, deleteBankForm } = props;

    const onDelete = (id: string) => () => { deleteBankForm(id); };

    return (bankRequisites
        ? (
            <>
                {bankRequisites.map((req) => (
                    <div key={req.id} className={cn()}>
                        <IconButton
                            size="small"
                            className={cn('button')}
                            onClick={onDelete(req.id)}
                        >
                            <Clear className={cn('icon')} />
                        </IconButton>
                        <Fields fields={BANK_FIELDS} entity={req} handler={updateBankForm} />
                    </div>
                ))}
            </>
        ) : null);
};

export { BankRequisitesFields };
