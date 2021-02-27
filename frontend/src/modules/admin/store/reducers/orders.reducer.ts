import { createReducer, getType } from 'typesafe-actions';
import { ordersActions } from '@admin/store/actions';
import { OrdersInitialState } from '@admin/interfaces';

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

export const orders = createReducer<OrdersInitialState>(initialState, {
    [getType(ordersActions.getOrdersList.success)]: (state, { payload }) => ({
        ...state,
        list: payload.list,
        meta: payload.meta
    })
});
