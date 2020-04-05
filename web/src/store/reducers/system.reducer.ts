import { createReducer, getType } from 'typesafe-actions';
import * as systemActions from '@actions/system.actions';

interface systemReducer {
    drawer: boolean;
}

const initialState = {
    drawer: false
};

const systemReducer = createReducer<systemReducer>(initialState, {
    [getType(systemActions.toggleDrawer)]: state => ({
        ...state,
        drawer: !state.drawer
    })
});

export default systemReducer;
