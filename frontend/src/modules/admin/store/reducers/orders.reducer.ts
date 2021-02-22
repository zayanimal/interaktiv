import { createReducer, getType } from 'typesafe-actions';
import { ordersActions } from '@admin/store/actions';
import { IOrdersInitialState } from '@admin/interfaces';

const initialState = {
    list: [],
    meta: {
        currentPage: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0
    },
    orderEditMode: true,
    orderEditName: ''
};

export const orders = createReducer<IOrdersInitialState>(initialState, {
    [getType(ordersActions.getOrdersList.success)]: (state, { payload }) => ({
        ...state,
        meta: payload.meta
    })
});
