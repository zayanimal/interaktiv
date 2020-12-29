import { createAction } from 'typesafe-actions';

export const searchUser = createAction('[ADMIN] SEARCH_USER')<string>();

export const setFound = createAction('[ADMIN] SEARCH_USER_SET_FOUND')<string[]>();
