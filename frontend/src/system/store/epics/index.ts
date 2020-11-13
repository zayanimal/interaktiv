import { combineEpics, Epic } from 'redux-observable';
import { getCredentials, getCurrentUser, logout } from './credentials';
import { getRouterItems } from './router';

export const systemEpic: Epic = combineEpics(
    getCredentials,
    getCurrentUser,
    getRouterItems,
    logout
);
