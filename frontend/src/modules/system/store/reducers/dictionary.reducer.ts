import { createReducer, getType } from 'typesafe-actions';
import * as dictionaryActions from '@system/store/actions/dictionary.actions';
import { Dictionary } from '@system/interfaces/dictionary.interface';

interface InitialState {
    roles: Dictionary[];
    permissions: Dictionary[];
}

const initialState = {
    roles: [],
    permissions: []
};

export const dictionaryReducer = createReducer<InitialState>(initialState, {
    [getType(dictionaryActions.setDictionary)]: (state, { payload }) => ({
        ...state,
        ...payload
    }),

    [getType(dictionaryActions.clearDictionary)]: () => ({ ...initialState })
});
