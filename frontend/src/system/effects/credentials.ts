import { of } from 'rxjs';
import {
    filter,
    first,
    map,
    switchMap,
    mergeMap,
    catchError,
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';

/**
 * Проверка прав доступа и установка метаданных пользователя
 * @param action$
 * @param state$
 */
export const getCredentials: Epic = (action$, state$, { rest, token }) => action$.pipe(
    filter(isActionOf(systemActions.getCredentials)),
    switchMap(() => state$.pipe(
        first(),
        map(systemSelectors.credentials),
        mergeMap((credentials) => rest.post$('auth/login', credentials)),
        mergeMap((request) => {
            token.setToken(request.response.accessToken);

            return of(systemActions.setAuth(request.response));
        }),
        catchError((err) => of(systemActions.errorNotification(err.response.message))),
    )),
);

/**
 * Проверка состояния авторизации текущего пользователя
 * @param action$
 */
export const getCurrentUser: Epic = (action$, _, { rest }) => action$.pipe(
    filter(isActionOf(systemActions.checkAuth)),
    mergeMap(() => rest.get$('auth/current')),
    map((request) => systemActions.setAuth(request.response)),
    catchError(() => of(systemActions.clearUser())),
);

/**
 * Выход из системы
 * @param action$
 */
export const logout: Epic = (action$, _, { token }) => action$.pipe(
    filter(isActionOf(systemActions.logOut)),
    map(() => {
        token.removeToken();

        return systemActions.clearUser();
    }),
);
