import { createAction } from 'typesafe-actions';

export const toggleDrawer = createAction('[SYSTEM] TOGGLE_DRAWER')<undefined>();
export type toggleDrawerType = typeof toggleDrawer;
export const setHeaderTitle = createAction('[SYSTEM] SET_HEADER_TITLE')<string>();
export type setHeaderTitleType = typeof setHeaderTitle;
