import { createAction } from 'typesafe-actions';

export const open = createAction('[CUSTOMER] OPEN_DRAWER')<undefined>();
export const close = createAction('[CUSTOMER] CLOSE_DRAWER')<undefined>();

export const setCustomer = createAction('[CUSTOMER] SET_DRAWER_CUSTOMER')<string>();
export const setCity = createAction('[CUSTOMER] SET_DRAWER_CITY')<string>();
export const setDate = createAction('[CUSTOMER] SET_DRAWER_DATE')<Date | null>();
export const setComment = createAction('[CUSTOMER] SET_DRAWER_COMMENT')<string>();

export const setValid = createAction('[CUSTOMER] SET_DRAWER_VALIDATION')<boolean>();
