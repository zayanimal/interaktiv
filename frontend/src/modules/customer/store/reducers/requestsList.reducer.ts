import { requestsListActions } from '@customer/store/actions';
import { createReducer, getType } from 'typesafe-actions';

type Status = 1 | 2 | 3 | 4;

export interface Requests {
    id: number;
    status: Status;
    creationDate: string;
    endUser: string;
}

interface State {
    requests: Requests[];
}

const initialState = {
    requests: []
};

const requestsList = createReducer<State>(initialState, {
    [getType(requestsListActions.getRequestsList.success)]: (
        state,
        { payload }
    ) => ({
        ...state,
        requests: payload
    })
});

export { requestsList };
