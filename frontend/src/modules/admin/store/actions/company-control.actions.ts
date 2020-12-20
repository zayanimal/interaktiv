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

export const setName = createAction('[ADMIN] COMPANY_SET_NAME')<string>();

export const setUsers = createAction('[ADMIN] COMPANY_SET_USERS')<string[]>();

export const setEmail = createAction('[ADMIN] COMPANY_SET_EMAIL')<string>();

export const setPhone = createAction('[ADMIN] COMPANY_SET_PHONE')<string>();

export const setWebsite = createAction('[ADMIN] COMPANY_SET_WEBSITE')<string>();

export const setValidationErrors = createAction('[ADMIN] SET_COMPANY_VALIDATION_ERRORS')<object>();

export const clearValidationErrors = createAction('[ADMIN] CLEAR_COMPANY_VALIDATION_ERRORS')();
