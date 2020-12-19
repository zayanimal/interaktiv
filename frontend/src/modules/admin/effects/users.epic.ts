import { of, merge, forkJoin } from 'rxjs';
import {
    filter,
    first,
    map,
    mergeMap,
    switchMap,
    catchError,
} from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { usersActions, userControlActions } from '@admin/store/actions';
import { userSelectors, userControlSelectors } from '@admin/store/selectors';
import { UserFormEntity, ContactsEntity } from '@admin/entities';

/**
 * Получить список пользователей с пагинацией
 * @param action$
 * @param state$
 * @param services
 */
export const getUsersList: Epic = (action$, _, { users }) => action$.pipe(
    filter(isActionOf(usersActions.getUsersList.request)),
    mergeMap(({ payload }) => users.getList$(payload)),
    map(({ response }) => usersActions.getUsersList.success(response)),
    catchError((err, caught) => merge(
        caught,
        of(systemActions.errorNotification(err.message)),
    )),
);

/**
 * Добавить нового пользователя
 * @param action$
 * @param state$
 * @param services
 */
export const sendNewUser: Epic = (action$, state$, { users, validation }) => action$.pipe(
    filter(isActionOf(userControlActions.addNewUser)),
    mergeMap(() => state$.pipe(
        first(),
        map((state) => ({
            ...userControlSelectors.newUser(state),
            contacts: plainToClass(ContactsEntity, userControlSelectors.newContacts(state))
        })),
        mergeMap((payld) => validation.check$(plainToClass(UserFormEntity, payld))),
        mergeMap((payload) => users.create$(payload)),
    )),
    switchMap(({ response }) => merge(
        of(userControlActions.setValidationErrors({})),
        of(systemActions.successNotification(response.message)))
    ),
    catchError((err, caught) => merge(
        caught,
        of(userControlActions.setValidationErrors(err)),
    )),
);

/**
 * Удалить пользователя и отфильтровать список
 * @param action$
 * @param state$
 * @param services
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
        caught,
        of(systemActions.errorNotification(err.response.message)),
    )),
);
