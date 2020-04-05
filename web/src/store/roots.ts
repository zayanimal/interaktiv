import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import systemReducer from '@store/reducers/system.reducer';

export const rootReducer = combineReducers({
    system: systemReducer
});

export const rootEpic: Epic = combineEpics(

);

export type rootState = ReturnType<typeof rootReducer>;