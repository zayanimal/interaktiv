import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { Preloader } from '@system/components/Preloader';
import { CompanyFields } from '@admin/components/CompanyFields';
import { FormControls } from '@admin/components/FormControls';
import { CompanyRequisites } from '@admin/components/CompanyRequisites';
import { RequisitesDrawer } from '@admin/components/RequisitesDrawer';
import { systemActions } from '@system/store/actions';
import { companiesActions, companyControlActions } from '@admin/store/actions';
import { companySelectors, companyControlSelectors } from '@admin/store/selectors';
import { bem } from '@utils/formatters';

const grid = bem('FlexGrid');

const mapStateToProps = (state: RootStateTypes) => ({
    loading: companyControlSelectors.loading(state),
    companyEditMode: companySelectors.companyEditMode(state),
    companyForm: companyControlSelectors.companyForm(state),
    contactForm: companyControlSelectors.contactForm(state),
    drawer: companyControlSelectors.drawer(state),
    requisites: companyControlSelectors.requisites(state),
    requisitesById: companyControlSelectors.requisitesById(state),
    bankRequisites: companyControlSelectors.bankRequisites(state),
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    setCompanyEditMode: companiesActions.setCompanyEditMode,
    getCompany: companyControlActions.getCompany.request,
    setDrawer: companyControlActions.setDrawerState,
    setCurrentRequisites: companyControlActions.setCurrentRequisites,
    setCompanyForm: companyControlActions.setCompanyForm,
    setContactForm: companyControlActions.setContactForm,
    setRequisitesForm: companyControlActions.setRequsitesForm,
    setBankForm: companyControlActions.setBankForm,
    deleteBankForm: companyControlActions.deleteBankForm,
};

export type CompanyControlProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const CompanyControl: React.FC<CompanyControlProps> = (props) => {
    const {
        loading,
        setHeaderTitle,
        companyEditMode,
        setCompanyEditMode,
        getCompany,
    } = props;

    const { path, params } = useRouteMatch<{ id: string }>();

    useEffect(() => {
        if (path.includes('edit')) {
            getCompany(params.id);
            setHeaderTitle('Редактирование компании');
            setCompanyEditMode(true);
        } else {
            setHeaderTitle('Добавление компании');
            setCompanyEditMode(false);
        }
    }, []); // eslint-disable-line

    return (companyEditMode && loading ? <Preloader /> : (
        <>
            <div className={grid('row')}>
                <div className={grid('col-6')}>
                    <h3>Данные</h3>
                    <CompanyFields {...props} />
                </div>
                <div className={grid('col-6')}>
                    <h3>Пользователи</h3>
                    <h3>Реквизиты</h3>
                    <CompanyRequisites {...props} />
                </div>
            </div>
            <FormControls
                mode={false}
                backward="/companies"
                onEdit={() => {}}
                onAdd={() => {}}
            />
            <RequisitesDrawer {...props} />
        </>
    ));
};

const CompanyControlConnected = connect(mapStateToProps, mapDispatchToProps)(CompanyControl);

export { CompanyControlConnected as CompanyControl };
