import { combineEpics, Epic } from 'redux-observable';
import { getPriceListData } from './request.epics';

export const customerEpic: Epic = combineEpics(
    getPriceListData
);
