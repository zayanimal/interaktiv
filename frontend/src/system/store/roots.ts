import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { systemReducer } from '@system/store/reducers/system.reducer';
import { customerReducer } from '@customer/store/reducers';
import { systemEpic } from '@system/store/epics';
import { customerEpic } from '@customer/store/epics';

export const rootReducer = combineReducers({
    system: systemReducer,
    customer: customerReducer
});

export const rootEpic: Epic = combineEpics(
    systemEpic,
    customerEpic
);

export type rootStateTypes = ReturnType<typeof rootReducer>;
