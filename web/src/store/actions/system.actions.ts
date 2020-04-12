import { createAction } from 'typesafe-actions';

export const toggleDrawer = createAction('[SYSTEM] TOGGLE DRAWER')<undefined>();

export interface systemActionsTypes {
    toggle?: typeof toggleDrawer;
};
