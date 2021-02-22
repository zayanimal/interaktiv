import { RootStateTypes } from '@config/roots';

const ordersState = (state: RootStateTypes) => state.admin.orders;

export const list = (state: RootStateTypes) => ordersState(state).list;

export const meta = (state: RootStateTypes) => ordersState(state).meta;
