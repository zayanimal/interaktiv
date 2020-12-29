import { createAction } from 'typesafe-actions';

export const searchUser = createAction('[ADMIN] SEARCH_USER')<string>();

export const setFound = createAction('[ADMIN] SEARCH_USER_SET_FOUND')<string[]>();

export const select = createAction('[ADMIN] SEARCH_USER_SELECT_USER')<string>();

export const deleteSelected = createAction('[ADMIN] SEARCH_USER_DELETE_SELECTED')<string>();
