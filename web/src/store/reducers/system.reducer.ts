import { createReducer, getType } from 'typesafe-actions';
import * as systemActions from '@actions/system.actions';

export interface systemStateTypes {
    drawer: boolean;
};

const initialState = {
    drawer: false
};

const systemReducer = createReducer<systemStateTypes>(initialState, {
    [getType(systemActions.toggleDrawer)]: state => ({
        ...state,
        drawer: !state.drawer
    })
});

export default systemReducer;
