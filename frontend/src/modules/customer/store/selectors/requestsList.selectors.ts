import { RootStateTypes } from '@config/roots';

export const requestsListState = (state: RootStateTypes) =>
    state.customer.requestsList;
export const requests = (state: RootStateTypes) =>
    requestsListState(state).requests;
