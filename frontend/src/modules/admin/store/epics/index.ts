import { combineEpics, Epic } from 'redux-observable';
import { getUsersList, sendNewUser, removeUser } from '@admin/store/epics/users.epic';

export const adminEpic: Epic = combineEpics(
    getUsersList,
    sendNewUser,
    removeUser,
);
