import { of, merge, from } from 'rxjs';
import {
    filter,
    first,
    map,
    mergeMap,
    catchError
} from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { usersActions, userAddActions } from '@admin/store/actions';
import { userAddSelectors } from '@admin/store/selectors';
import { userService } from '@admin/services/users.service';

/**
 * Получить список пользователей с пагинацией
 * @param action$
 */
export const getUsersList: Epic = (action$) => action$.pipe(
    filter(isActionOf(usersActions.getUsersList.request)),
    mergeMap(({ payload }) => userService.getList$(payload)),
    map(({ response }) => usersActions.getUsersList.success(response)),
    catchError((err, caught) => merge(
        of(systemActions.errorNotification(err.message)),
        caught
    ))
);

/**
 * Добавить нового пользователя
 * @param action$
 * @param state$
 */
export const sendNewUser: Epic = (action$, state$) => action$.pipe(
    filter(isActionOf(userAddActions.addNewUser)),
    mergeMap(() => state$.pipe(
        first(),
        map(userAddSelectors.newUser)
    )),
    mergeMap((payload) => userService.add$(payload)),
    mergeMap(() => from([
        userAddActions.clearUserData(),
        systemActions.successNotification('Пользователь добавлен')
    ])),
    catchError((err, caught) => merge(
        of(systemActions.errorNotification(err.response.message)),
        caught
    ))
);
