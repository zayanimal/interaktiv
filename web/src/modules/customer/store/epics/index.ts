import { combineEpics, Epic } from 'redux-observable';
import { getRequestPriceListData } from './getRequestPriceListData';
import { getRequestsList } from './getRequestsList';
import { clearRequestDrawer, sendRequestNewProject } from './sendRequestNewProject';

export const customerEpic: Epic = combineEpics(
    getRequestPriceListData,
    sendRequestNewProject,
    clearRequestDrawer,
    getRequestsList
);
