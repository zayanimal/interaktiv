import {
    filter,
    first,
    map,
    switchMap,
    mergeMap,
    tap
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';

export const getCredentials: Epic = (action$, state$) => action$.pipe(
    filter(isActionOf(systemActions.getCredentials)),
    switchMap(() => state$.pipe(
        first(),
        map(systemSelectors.credentials),
        mergeMap((credentials) => ajax({
            url: 'http://interaktiv:8000/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: credentials
        })),
        first(),
        tap(console.log)
    ))
);
