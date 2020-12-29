import { RootStateTypes } from '@config/roots';

const searchUserState = (state: RootStateTypes) => state.admin.searchUser;

export const found = (state: RootStateTypes) => searchUserState(state).found;

export const selected = (state: RootStateTypes) => searchUserState(state).selected;
