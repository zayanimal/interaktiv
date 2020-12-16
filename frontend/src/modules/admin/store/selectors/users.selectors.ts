import { RootStateTypes } from '@config/roots';

const usersState = (state: RootStateTypes) => state.admin.users;

export const list = (state: RootStateTypes) => usersState(state).list;

export const meta = (state: RootStateTypes) => usersState(state).meta;

export const userEditMode = (state: RootStateTypes) => usersState(state).userEditMode;

export const userEditName = (state: RootStateTypes) => usersState(state).userEditName;
