import { rootStateTypes } from '@system/store/roots';

const usersState = (state: rootStateTypes) => state.admin.users;

export const list = (state: rootStateTypes) => usersState(state).list;

export const meta = (state: rootStateTypes) => usersState(state).meta;

export const userEditMode = (state: rootStateTypes) => usersState(state).userEditMode;

export const userEditName = (state: rootStateTypes) => usersState(state).userEditName;
