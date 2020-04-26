import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { systemReducer } from '@system/store/reducers/system.reducer';
import { customerReducer } from '@customer/store/reducers';
import { customerEpic } from '@customer/store/epics';

export const rootReducer = combineReducers({
    system: systemReducer,
    customer: customerReducer
});

export const rootEpic: Epic = combineEpics(
    customerEpic
);

export type rootStateTypes = ReturnType<typeof rootReducer>;
