import { combineEpics, Epic } from 'redux-observable';
import { getRequestPriceListData } from './getRequestPriceListData';
import { getRequestsList } from './getRequestsList';
import { clearRequestDrawer, sendRequestNewProject } from './sendRequestNewProject';
import { filterRequestPriceList } from './filterRequestPriceList';

export const customerEpic: Epic = combineEpics(
    getRequestPriceListData,
    sendRequestNewProject,
    filterRequestPriceList,
    clearRequestDrawer,
    getRequestsList
);
