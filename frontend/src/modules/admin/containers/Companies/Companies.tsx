import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
    useRouteMatch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';
import { systemActions } from '@system/store/actions';
import { companiesActions } from '@admin/store/actions';
import { companySelectors } from '@admin/store/selectors';
import { CompaniesList } from '@admin/components/CompaniesList';

const mapStateToProps = (state: RootStateTypes) => ({
    list: companySelectors.list(state),
    meta: companySelectors.meta(state),
});

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getList: companiesActions.getCompaniesList.request,
    removeCompany: companiesActions.removeCompany,
    setCompanyEditName: companiesActions.setCompanyEditName,
    setCompanyEditMode: companiesActions.setCompanyEditMode,
};

export type CompaniesProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Companies: React.FC<CompaniesProps> = (props) => {
    const { setHeaderTitle, getList, meta } = props;
    const { pathname } = useLocation();
    const { path } = useRouteMatch();

    useEffect(() => {
        if (pathname === '/companies') {
            setHeaderTitle('Управление компаниями');

            if (!meta.currentPage) { getList(1); }
        }
    }, [getList, setHeaderTitle, pathname, meta]);

    return (
        <Switch>
            <Route path={`${path}/add`} />
            <Route path={`${path}/edit/:company`} />
            <Route
                exact
                path={path}
                render={() => (<CompaniesList {...props} />)}
            />
        </Switch>
    );
};

const CompaniesConnected = connect(mapStateToProps, mapDispatchToProps)(Companies);

export { CompaniesConnected as Companies };
