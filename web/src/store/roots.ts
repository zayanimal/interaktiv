import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import systemReducer from '@store/reducers/system.reducer';
import projectRequestReducer from '@store/reducers/projectRequest.reducer';
import { fetchPriceListEpic } from '@store/epics/projectRequest.epics';

export const rootReducer = combineReducers({
    system: systemReducer,
    projectRequest: projectRequestReducer
});

export const rootEpic: Epic = combineEpics(
    fetchPriceListEpic
);

export type rootStateTypes = ReturnType<typeof rootReducer>;
