import { combineEpics, Epic } from 'redux-observable';
import { getCredentials } from './getCredentials';
import { checkAuth } from './checkAuth';

export const systemEpic: Epic = combineEpics(
    getCredentials,
    checkAuth
);
