import { createReducer, getType } from 'typesafe-actions';
import { requestDrawerActions } from '@customer/store/actions';

interface DrawerTypes {
    openDrawer: boolean;
    customer: string;
    city?: string;
    date: Date;
    comment?: string;
    validation: boolean;
};

const initialState = {
    openDrawer: false,
    customer: '',
    city: '',
    date: new Date((new Date()).getTime() + 604800000),
    comment: '',
    validation: false
};

const requestDrawer = createReducer<DrawerTypes>(initialState, {
    [getType(requestDrawerActions.open)]: (state) => ({
        ...state,
        openDrawer: true
    }),
    [getType(requestDrawerActions.close)]: (state) => ({
        ...state,
        openDrawer: false
    }),
    [getType(requestDrawerActions.setCustomer)]: (state, { payload }) => ({
        ...state,
        customer: payload
    }),
    [getType(requestDrawerActions.setCity)]: (state, { payload }) => ({
        ...state,
        city: payload
    }),
    [getType(requestDrawerActions.setDate)]: (state, { payload }) => ({
        ...state,
        date: payload
    }),
    [getType(requestDrawerActions.setComment)]: (state, { payload }) => ({
        ...state,
        comment: payload
    }),
    [getType(requestDrawerActions.setValid)]: (state, { payload }) => ({
        ...state,
        validation: payload
    })
});

export { requestDrawer };
