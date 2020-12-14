import { RootStateTypes } from '@system/store/roots';

export const requestState = (state: RootStateTypes) => state.customer.request;

export const rate = (state: RootStateTypes) => requestState(state).rate;

export const modelInputValue = (state: RootStateTypes) => requestState(state).modelInput;

export const modelsData = (state: RootStateTypes) => requestState(state).modelsData;

export const modelsDataInOrder = (state: RootStateTypes) => requestState(state).modelsDataInOrder;

export const modelsSelected = (state: RootStateTypes) => requestState(state).modelsSelected;

export const listState = (state: RootStateTypes) => requestState(state).showList;

export const orderForSend = (state: RootStateTypes) => ({
    modelsDataInOrder: modelsDataInOrder(state),
    rate: rate(state),
});
