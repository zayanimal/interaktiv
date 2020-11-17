import { combineEpics, Epic } from 'redux-observable';
import { getCredentials, getCurrentUser, logout } from './credentials';
import { getRouterItems } from './router';
import { getDrawerState, setDrawerState } from './drawer';

export const systemEpic: Epic = combineEpics(
    getCredentials,
    getCurrentUser,
    getRouterItems,
    logout,
    getDrawerState,
    setDrawerState
);
