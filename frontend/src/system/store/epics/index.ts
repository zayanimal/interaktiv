import { combineEpics, Epic } from 'redux-observable';
import { getCredentials } from './getCredentials';

export const systemEpic: Epic = combineEpics(
    getCredentials
);
