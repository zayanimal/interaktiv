import { createReducer, getType } from 'typesafe-actions';
import * as systemActions from '@system/store/actions/system.actions';

const initialState = {
    drawer: false
};

export type systemStateTypes = typeof initialState;

const systemReducer = createReducer<systemStateTypes>(initialState, {
    [getType(systemActions.toggleDrawer)]: state => ({
        ...state,
        drawer: !state.drawer
    })
});

export { systemReducer };
