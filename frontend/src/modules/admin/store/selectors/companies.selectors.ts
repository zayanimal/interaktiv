import { RootStateTypes } from '@config/roots';

const companiesState = (state: RootStateTypes) => state.admin.companies;

export const list = (state: RootStateTypes) => companiesState(state).list;

export const meta = (state: RootStateTypes) => companiesState(state).meta;

export const companyEditMode = (state: RootStateTypes) =>
    companiesState(state).companyEditMode;

export const companyEditName = (state: RootStateTypes) =>
    companiesState(state).companyEditName;
