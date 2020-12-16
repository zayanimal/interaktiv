import { of, merge, forkJoin } from 'rxjs';
import {
    filter,
    first,
    map,
    mergeMap,
    catchError,
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { usersActions, userControlActions } from '@admin/store/actions';
import { userSelectors, userControlSelectors } from '@admin/store/selectors';

/**
 * Получить список пользователей с пагинацией
 * @param action$
 */
export const getUsersList: Epic = (action$, _, { users }) => action$.pipe(
    filter(isActionOf(usersActions.getUsersList.request)),
    mergeMap(({ payload }) => users.getList$(payload)),
    map(({ response }) => usersActions.getUsersList.success(response)),
    catchError((err, caught) => merge(
        of(systemActions.errorNotification(err.message)),
        caught,
    )),
);

/**
 * Добавить нового пользователя
 * @param action$
 * @param state$
 */
export const sendNewUser: Epic = (action$, state$, { users }) => action$.pipe(
    filter(isActionOf(userControlActions.addNewUser)),
    mergeMap(() => state$.pipe(
        first(),
        map(userControlSelectors.newUser),
    )),
    mergeMap((user) => state$.pipe(
        first(),
        map(userControlSelectors.newContacts),
        map((contacts) => Object.assign(user, { contacts })),
    )),
    mergeMap((payload) => users.add$(payload)),
    map(({ response }) => systemActions.successNotification(response.message)),
    catchError((err, caught) => merge(
        of(systemActions.errorNotification(err.response.message)),
        caught,
    )),
);

/**
 * Удалить пользователя и отфильтровать список
 * @param action$
 */
export const removeUser: Epic = (action$, state$, { users }) => action$.pipe(
    filter(isActionOf(usersActions.removeUser)),
    mergeMap(({ payload }) => forkJoin({
        response: users.delete$(payload),
        payload: of(payload),
    })),
    mergeMap(({ payload }) => state$.pipe(
        first(),
        map(userSelectors.list),
        map((list) => list.filter(({ username }) => username !== payload)),
        map(usersActions.setFiltredUsersList),
    )),
    catchError((err, caught) => merge(
        of(systemActions.errorNotification(err.response.message)),
        caught,
    )),
);
