import { pick } from 'lodash';
import { RootStateTypes } from '@config/roots';

const companyControlState = (state: RootStateTypes) => state.admin.companyControl;

export const loading = (state: RootStateTypes) => companyControlState(state).loading;

export const id = (state: RootStateTypes) => companyControlState(state).id;

export const name = (state: RootStateTypes) => companyControlState(state).name;

export const users = (state: RootStateTypes) => companyControlState(state).users;

const contact = (state: RootStateTypes) => companyControlState(state).contact;

export const email = (state: RootStateTypes) => contact(state).email;

export const phone = (state: RootStateTypes) => contact(state).phone;

export const website = (state: RootStateTypes) => contact(state).website;

export const validation = (state: RootStateTypes) => pick(companyControlState(state), [
    'errorName',
    'errorUsers',
    'errorEmail',
    'errorPhone',
    'errorWebsite',
]);
