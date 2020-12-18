import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { mainReducer } from '@system/store/reducers';
import { adminReducer } from '@admin/store/reducers';
import { customerReducer } from '@customer/store/reducers';
import { systemEpic } from '@system/effects';
import { adminEpic } from '@admin/effects';
import { customerEpic } from '@customer/store/epics';

export const rootReducer = combineReducers({
    system: mainReducer,
    admin: adminReducer,
    customer: customerReducer,
});

export const rootEpic: Epic = combineEpics(
    systemEpic,
    adminEpic,
    customerEpic,
);

export type RootStateTypes = ReturnType<typeof rootReducer>;
