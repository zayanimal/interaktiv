import { combineEpics, Epic } from 'redux-observable';
import { getUsersList, sendNewUser, removeUser } from '@admin/store/epics/users.epic';
import { getUser, editUser } from '@admin/store/epics/form.epic';

export const adminEpic: Epic = combineEpics(
    getUsersList,
    sendNewUser,
    removeUser,
    getUser,
    editUser,
);
