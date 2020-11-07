import { combineEpics, Epic } from 'redux-observable';
import { getCredentials, checkAuth, logout } from './credentials';

export const systemEpic: Epic = combineEpics(
    getCredentials,
    checkAuth,
    logout
);
