import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { systemReducer } from '@system/store/reducers/system.reducer';
import { adminReducer } from '@admin/store/reducers';
import { customerReducer } from '@customer/store/reducers';
import { systemEpic } from '@system/store/epics';
import { adminEpic } from '@admin/store/epics';
import { customerEpic } from '@customer/store/epics';

export const rootReducer = combineReducers({
    system: systemReducer,
    admin: adminReducer,
    customer: customerReducer
});

export const rootEpic: Epic = combineEpics(
    systemEpic,
    adminEpic,
    customerEpic
);

export type rootStateTypes = ReturnType<typeof rootReducer>;
