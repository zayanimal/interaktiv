import React from 'react';
import { CompanyControlProps } from '@admin/containers/CompanyControl';
import { Fields } from '@shared/components/Fields';
import './RequisitesFields.scss';

const RequisitesFields: React.FC<CompanyControlProps> = (props) => {
    const { requisitesById, setRequisitesForm } = props;

    const fieldsReqs = [
        { label: 'Название', name: 'name', class: 'RequisitesFields' },
        { label: 'ИНН', name: 'inn', class: 'RequisitesFields' },
        { label: 'КПП', name: 'kpp', class: 'RequisitesFields' },
        { label: 'ОГРН', name: 'ogrn', class: 'RequisitesFields' },
    ];

    return (requisitesById
        ? (
            <Fields
                fields={fieldsReqs}
                entity={requisitesById}
                handler={setRequisitesForm}
            />
        ) : null);
};

export { RequisitesFields };
