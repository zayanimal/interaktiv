import { combineEpics, Epic } from 'redux-observable';
import { getUsersList, sendNewUser } from '@admin/store/epics/users.epic';

export const adminEpic: Epic = combineEpics(
    getUsersList,
    sendNewUser
);
