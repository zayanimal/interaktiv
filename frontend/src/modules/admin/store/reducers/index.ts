import { combineReducers } from 'redux';
import { users } from '@admin/store/reducers/users.reducer';
import { userControl } from '@admin/store/reducers/user-control.reducer';
import { companies } from '@admin/store/reducers/companies.reducer';
import { companyControl } from '@admin/store/reducers/company-control.reducer';
import { searchUser } from '@admin/store/reducers/search-user.reducer';


export const adminReducer = combineReducers({
    users,
    userControl,
    companies,
    companyControl,
    searchUser,
});
