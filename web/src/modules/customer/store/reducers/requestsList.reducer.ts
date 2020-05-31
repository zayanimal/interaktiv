import { createReducer, getType } from 'typesafe-actions';
import { requestsListActions } from '@customer/store/actions';

const initialState = {

};

const requestsList = createReducer<typeof initialState>(initialState, {
    [getType(requestsListActions.getRequestsList.success)]: (state, { payload }) => ({
        ...state
    })
});

export { requestsList };
