import { rootStateTypes } from '@system/store/roots';

const usersState = (state: rootStateTypes) => state.admin.users;

export const list = (state: rootStateTypes) => usersState(state).list;
