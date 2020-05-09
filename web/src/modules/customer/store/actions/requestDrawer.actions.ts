import { createAction } from 'typesafe-actions';

export const open = createAction('[CUSTOMER] OPEN_DRAWER')<undefined>();
export const close = createAction('[CUSTOMER] CLOSE_DRAWER')<undefined>();
