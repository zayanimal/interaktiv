import React from 'react';
import { CompanyControlProps } from '@admin/containers/CompanyControl';
import { Fields } from '@shared/components/Fields';
import { REQUISITES_FIELDS } from '@admin/constants';
import './RequisitesFields.scss';

const RequisitesFields: React.FC<CompanyControlProps> = (props) => {
    const { requisitesById, updateRequisitesForm } = props;

    return requisitesById ? (
        <Fields
            fields={REQUISITES_FIELDS}
            entity={requisitesById}
            handler={updateRequisitesForm}
        />
    ) : null;
};

export { RequisitesFields };
