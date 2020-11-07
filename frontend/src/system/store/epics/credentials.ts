import { of } from 'rxjs';
import {
    filter,
    first,
    map,
    switchMap,
    mergeMap
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';
import { tokenService } from '@system/services/token.service';

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
        mergeMap((credentials) => ajax({
            url: 'http://interaktiv:8000/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: credentials
        })),
        mergeMap((request) => {
            if (request.status === 201) {
                tokenService.setToken(request.response.accessToken);

                return of(request.response);
            }

            return of(systemActions.errorNotification('Ошибка авторизации'));
        }),
        map(({ role }) => systemActions.setRole(role))
    ))
);

/**
 * Проверка локал стораджа на валидность токена
 * @param action$
 */
export const checkAuth: Epic = (action$) => action$.pipe(
    filter(isActionOf(systemActions.checkAuth)),
    map(() => systemActions.setAuth(tokenService.isLoggedIn())),
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
    })
);
