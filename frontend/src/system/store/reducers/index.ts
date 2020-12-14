import { combineReducers } from 'redux';
import { systemReducer } from '@system/store/reducers/system.reducer';
import { dictionaryReducer } from '@system/store/reducers/dictionary.reducer';

export const mainReducer = combineReducers({
    system: systemReducer,
    dictionary: dictionaryReducer,
});
