import { createAction } from 'typesafe-actions';

export const open = createAction('[CUSTOMER] OPEN_DRAWER')<undefined>();
export const close = createAction('[CUSTOMER] CLOSE_DRAWER')<undefined>();

export const setCustomer = createAction(
    '[CUSTOMER] SET_DRAWER_CUSTOMER'
)<string>();
export const setCity = createAction('[CUSTOMER] SET_DRAWER_CITY')<string>();
export const setDate = createAction(
    '[CUSTOMER] SET_DRAWER_DATE'
)<Date | null>();
export const setComment = createAction(
    '[CUSTOMER] SET_DRAWER_COMMENT'
)<string>();

export const setCustomerError = createAction(
    '[CUSTOMER] SET_DRAWER_CUSTOMER_ERROR'
)<boolean>();
export const setCityError = createAction(
    '[CUSTOMER] SET_DRAWER_CITY_ERROR'
)<boolean>();
export const setCommentError = createAction(
    '[CUSTOMER] SET_DRAWER_COMMENT_ERROR'
)<boolean>();
export const setValid = createAction(
    '[CUSTOMER] SET_DRAWER_VALIDATION'
)<boolean>();

export const clearDrawer = createAction('[CUSTOMER] CLEAR_DRAWER')();
