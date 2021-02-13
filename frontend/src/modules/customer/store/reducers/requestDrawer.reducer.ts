import { requestDrawerActions } from '@customer/store/actions';
import { createReducer, getType } from 'typesafe-actions';

const initialState = {
    openDrawer: false,
    customer: '',
    customerError: true,
    city: '',
    cityError: false,
    date: new Date(new Date().getTime() + 604800000),
    comment: '',
    commentError: false,
    validation: false
};

const requestDrawer = createReducer<typeof initialState>(initialState, {
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

    [getType(requestDrawerActions.setCustomerError)]: (state, { payload }) => ({
        ...state,
        customerError: payload
    }),

    [getType(requestDrawerActions.setCity)]: (state, { payload }) => ({
        ...state,
        city: payload
    }),

    [getType(requestDrawerActions.setCityError)]: (state, { payload }) => ({
        ...state,
        cityError: payload
    }),

    [getType(requestDrawerActions.setDate)]: (state, { payload }) => ({
        ...state,
        date: payload
    }),

    [getType(requestDrawerActions.setComment)]: (state, { payload }) => ({
        ...state,
        comment: payload
    }),

    [getType(requestDrawerActions.setCommentError)]: (state, { payload }) => ({
        ...state,
        commentError: payload
    }),

    [getType(requestDrawerActions.setValid)]: (state, { payload }) => ({
        ...state,
        validation: payload
    }),

    [getType(requestDrawerActions.clearDrawer)]: () => ({
        ...initialState
    })
});

export { requestDrawer };
