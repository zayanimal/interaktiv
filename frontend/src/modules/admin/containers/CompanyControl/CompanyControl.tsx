/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { Preloader } from '@system/components/Preloader';
import { CompanyFields } from '@admin/components/CompanyFields';
import { FormControls } from '@admin/components/FormControls';
import { CompanyRequisites } from '@admin/components/CompanyRequisites';
import { RequisitesDrawer } from '@admin/components/RequisitesDrawer';
import { SearchMultiSelect } from '@shared/components/SearchMultiSelect';
import { systemActions } from '@system/store/actions';
import { companyControlActions, searchUserActions } from '@admin/store/actions';
import { companySelectors, companyControlSelectors } from '@admin/store/selectors';
import { bem } from '@utils/formatters';

const grid = bem('FlexGrid');

const mapStateToProps = (state: RootStateTypes) => ({
    loading: companyControlSelectors.loading(state),
    isFetched: companyControlSelectors.isFetched(state),
    companyEditMode: companySelectors.companyEditMode(state),
    companyForm: companyControlSelectors.companyForm(state),
    contactForm: companyControlSelectors.contactForm(state),
    drawer: companyControlSelectors.drawer(state),
    requisites: companyControlSelectors.requisitesArr(state),
    requisitesById: companyControlSelectors.requisitesById(state),
    bankRequisites: companyControlSelectors.bankRequisites(state),
    users: companyControlSelectors.users(state),
    foundUsers: companyControlSelectors.foundUsers(state),
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    setFetched: companyControlActions.setFetched,
    getCompany: companyControlActions.getCompany.request,
    updateCompany: companyControlActions.updateCompany,
    createCompany: companyControlActions.createCompany,
    setDrawer: companyControlActions.setDrawerState,
    updateCurrentRequisites: companyControlActions.updateCurrentRequisites,
    updateCompanyForm: companyControlActions.updateCompanyForm,
    updateContactForm: companyControlActions.updateContactForm,
    updateRequisitesForm: companyControlActions.updateRequsitesForm,
    deleteRequisitesFrom: companyControlActions.deleteRequsitesForm,
    createRequisitesFrom: companyControlActions.createRequsitesForm,
    updateBankForm: companyControlActions.updateBankForm,
    deleteBankForm: companyControlActions.deleteBankForm,
    createBankForm: companyControlActions.createBankForm,
    searchUser: searchUserActions.searchUser,
    selectUser: searchUserActions.select,
    deleteUser: searchUserActions.deleteSelected,
    setFoundUser: searchUserActions.setFound,
    clearForms: companyControlActions.clearForms,
};

export type CompanyControlProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const CompanyControl: React.FC<CompanyControlProps> = (props) => {
    const {
        loading,
        isFetched,
        setHeaderTitle,
        companyEditMode,
        setFetched,
        getCompany,
        updateCompany,
        createCompany,
        users,
        searchUser,
        foundUsers,
        selectUser,
        deleteUser,
        setFoundUser,
        clearForms,
    } = props;

    const { path, params } = useRouteMatch<{ id: string }>();

    useEffect(() => {
        if (path.includes('edit')) {
            getCompany(params.id);
            setHeaderTitle('Редактирование компании');
            setFetched(false);
        } else {
            setHeaderTitle('Добавление компании');
        }
    }, []);

    return (isFetched && !loading ? (
        <>
            <div className={grid('row')}>
                <div className={grid('col-6')}>
                    <h3>Данные</h3>
                    <CompanyFields {...props} />
                </div>
                <div className={grid('col-6')}>
                    <h3>Пользователи</h3>
                    <SearchMultiSelect
                        found={foundUsers}
                        selected={users}
                        onChange={searchUser}
                        onSelect={selectUser}
                        onDelete={deleteUser}
                        onClear={setFoundUser}
                    />
                    <h3>Реквизиты</h3>
                    <CompanyRequisites {...props} />
                </div>
            </div>
            <FormControls
                mode={companyEditMode}
                backward="/companies"
                onEdit={updateCompany}
                onAdd={createCompany}
                onClean={clearForms}
            />
            <RequisitesDrawer {...props} />
        </>
    ) : <Preloader />);
};

const CompanyControlConnected = connect(mapStateToProps, mapDispatchToProps)(CompanyControl);

export { CompanyControlConnected as CompanyControl };
