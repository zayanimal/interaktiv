import { combineEpics, Epic } from 'redux-observable';
import { getCredentials, getCurrentUser, logout } from './credentials';

export const systemEpic: Epic = combineEpics(
    getCredentials,
    getCurrentUser,
    logout
);
