import { combineEpics, Epic } from 'redux-observable';
import { getUsersList } from '@admin/store/epics/users.epic';

export const adminEpic: Epic = combineEpics(
    getUsersList
);
