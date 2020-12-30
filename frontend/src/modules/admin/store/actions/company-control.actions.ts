import { createAction, createAsyncAction } from 'typesafe-actions';

export const getCompany = createAsyncAction(
    '[ADMIN] GET_COMPANY_REQUEST',
    '[ADMIN] GET_COMPANY_SUCCESS',
    '[ADMIN] GET_COMPANY_FAILURE',
)<string, object, unknown>();

export const editCompany = createAsyncAction(
    '[ADMIN] EDIT_COMPANY_REQUEST',
    '[ADMIN] EDIT_COMPANY_SUCCESS',
    '[ADMIN] EDIT_COMPANY_FAILURE',
)<string, any, any>();

export const updateCompany = createAction('[ADMIN] UPDATE_COMPANY')();

export const createCompany = createAction('[ADMIN] CREATE_COMPANY')();

export const setDrawerState = createAction('[ADMIN] SET_DRAWER_STATE')<boolean>();

export const updateCurrentRequisites = createAction('[ADMIN] UPDATE_CURRENT_REQUISITES')<string>();

export const updateCompanyForm = createAction('[ADMIN] UPDATE_COMPANY_FORM')<object>();

export const updateContactForm = createAction('[ADMIN] UPDATE_CONTACT_FORM')<object>();

export const updateRequsitesForm = createAction('[ADMIN] UPDATE_REQUISITES_FORM')<object>();

export const deleteRequsitesForm = createAction('[ADMIN] DELETE_REQUISITES_FORM')<string>();

export const createRequsitesForm = createAction('[ADMIN] CREATE_REQUISITES_FORM')();

export const putRequsitesForm = createAction('[ADMIN] PUT_REQUISITES_FORM')<object>();

export const updateBankForm = createAction('[ADMIN] UPDATE_BANK_FORM')<object>();

export const deleteBankForm = createAction('[ADMIN] DELETE_BANK_FORM')<string>();

export const createBankForm = createAction('[ADMIN] CREATE_BANK_FORM')();

export const putBankForm = createAction('[ADMIN] PUT_BANK_FORM')<object>();

export const updateUsers = createAction('[ADMIN] COMPANY_UPDATE_USERS')<string[]>();

export const clearForms = createAction('[ADMIN] COMPANY_CLEAR')();
