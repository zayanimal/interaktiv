import React from 'react';
import { CompanyControlProps } from '@admin/containers/CompanyControl';
import { Fields } from '@shared/components/Fields';

const CompanyFields: React.FC<CompanyControlProps> = (props) => {
    const { companyForm, setCompanyForm, contactForm, setContactForm } = props;
    const formFields = [{ label: 'Название компании', name: 'name' }];
    const contactFields = [
        { label: 'Почта', name: 'email' },
        { label: 'Телефон', name: 'phone' },
        { label: 'Сайт', name: 'website' },
    ];

    return (
        <>
            <Fields fields={formFields} entity={companyForm} handler={setCompanyForm} />
            <Fields fields={contactFields} entity={contactForm} handler={setContactForm} />
        </>
    );
};

export { CompanyFields };
