import { combineEpics, Epic } from 'redux-observable';
import { getRequestPriceListData } from './getRequestPriceListData';
import { sendRequestNewProject, clearRequestDrawer } from './sendRequestNewProject';

export const customerEpic: Epic = combineEpics(
    getRequestPriceListData,
    sendRequestNewProject,
    clearRequestDrawer
);
