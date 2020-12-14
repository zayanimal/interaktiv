import { of, merge } from 'rxjs';
import {
    filter,
    first,
    map,
    switchMap,
    mergeMap,
    catchError,
} from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';
import { tokenService } from '@system/services/token.service';
import { restService } from '@system/services/rest.service';

/**
 * Проверка прав доступа и установка метаданных пользователя
 * @param action$
 * @param state$
 */
export const getCredentials: Epic = (action$, state$) => action$.pipe(
    filter(isActionOf(systemActions.getCredentials)),
    switchMap(() => state$.pipe(
        first(),
        map(systemSelectors.credentials),
        mergeMap((credentials) => restService.post$('auth/login', credentials)),
        mergeMap((request) => {
            tokenService.setToken(request.response.accessToken);

            return of(systemActions.setAuth(request.response));
        }),
        catchError((err, caught) => merge(
            of(systemActions.errorNotification(err.response.message)),
            caught,
        )),
    )),
);

/**
 * Проверка состояния авторизации текущего пользователя
 * @param action$
 */
export const getCurrentUser: Epic = (action$) => action$.pipe(
    filter(isActionOf(systemActions.checkAuth)),
    mergeMap(() => restService.get$('auth/current')),
    map((request) => systemActions.setAuth(request.response)),
    catchError(() => of(systemActions.clearUser())),
);

/**
 * Выход из системы
 * @param action$
 */
export const logout: Epic = (action$) => action$.pipe(
    filter(isActionOf(systemActions.logOut)),
    map(() => {
        tokenService.removeToken();

        return systemActions.clearUser();
    }),
);
