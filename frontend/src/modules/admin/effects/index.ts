import { combineEpics, Epic } from 'redux-observable';
import { getUsersList, sendNewUser, removeUser } from '@admin/effects/users.epic';
import { getUser, editUser } from '@admin/effects/user-form.epic';
import { getCompaniesList } from '@admin/effects/companies.epic';

export const adminEpic: Epic = combineEpics(
    getUsersList,
    sendNewUser,
    removeUser,
    getUser,
    editUser,
    getCompaniesList,
);
