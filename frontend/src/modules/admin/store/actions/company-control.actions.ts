import { createAction, createAsyncAction } from 'typesafe-actions';

export const getCompany = createAsyncAction(
    '[ADMIN] GET_COMPANY_REQUEST',
    '[ADMIN] GET_COMPANY_SUCCESS',
    '[ADMIN] GET_COMPANY_FAILURE',
)<string, unknown, unknown>();

export const editCompany = createAsyncAction(
    '[ADMIN] EDIT_COMPANY_REQUEST',
    '[ADMIN] EDIT_COMPANY_SUCCESS',
    '[ADMIN] EDIT_COMPANY_FAILURE',
)<string, any, any>();

export const setDrawerState = createAction('[ADMIN] SET_DRAWER_STATE')<boolean>();

export const setCurrentRequisites = createAction('[ADMIN] SET_CURRENT_REQUISITES')<string>();

export const setCompanyForm = createAction('[ADMIN] SET_COMPANY_FORM')<object>();

export const setContactForm = createAction('[ADMIN] SET_CONTACT_FORM')<object>();

export const setRequsitesForm = createAction('[ADMIN] SET_REQUISITES_FORM')<object>();

export const setUsers = createAction('[ADMIN] COMPANY_SET_USERS')<string[]>();

export const setValidationErrors = createAction('[ADMIN] SET_COMPANY_VALIDATION_ERRORS')<object>();

export const clearValidationErrors = createAction('[ADMIN] CLEAR_COMPANY_VALIDATION_ERRORS')();
