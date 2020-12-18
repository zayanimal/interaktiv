import { combineEpics, Epic } from 'redux-observable';
import { getCredentials, getCurrentUser, logout } from '@system/effects/credentials.epic';
import { getRouterItems } from '@system/effects/router.epic';
import { getDrawerState, setDrawerState } from '@system/effects/drawer.epic';
import { getDictionary } from '@system/effects/dictionary.epic';

export const systemEpic: Epic = combineEpics(
    getCredentials,
    getCurrentUser,
    getRouterItems,
    logout,
    getDrawerState,
    setDrawerState,
    getDictionary,
);
