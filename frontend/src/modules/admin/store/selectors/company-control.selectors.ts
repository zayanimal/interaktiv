import { pick } from 'lodash';
import { RootStateTypes } from '@config/roots';

const companyControlState = (state: RootStateTypes) => state.admin.companyControl;

export const loading = (state: RootStateTypes) => companyControlState(state).loading;

export const id = (state: RootStateTypes) => companyControlState(state).id;

export const name = (state: RootStateTypes) => companyControlState(state).name;

export const users = (state: RootStateTypes) => companyControlState(state).users;

export const email = (state: RootStateTypes) => companyControlState(state).email;

export const phone = (state: RootStateTypes) => companyControlState(state).phone;

export const website = (state: RootStateTypes) => companyControlState(state).website;

export const validation = (state: RootStateTypes) => pick(companyControlState(state), [
    'errorName',
    'errorUsers',
    'errorEmail',
    'errorPhone',
    'errorWebsite',
]);
