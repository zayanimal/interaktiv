import { of } from 'rxjs';
import {
    filter,
    switchMap,
    mergeMap,
    catchError
} from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { get as getLs, set as setLs } from 'local-storage';
import { systemActions } from '@system/store/actions';

export const getDrawerState: Epic = (action$) => action$.pipe(
    filter(isActionOf(systemActions.getDrawerState)),
    switchMap(() => of(
        systemActions.setDrawerState(
            getLs<boolean>('drawerState')
        )
    )),
    catchError((err) => of(systemActions.errorNotification(err.message)))
);

export const setDrawerState: Epic = (action$) => action$.pipe(
    filter(isActionOf(systemActions.setLsDrawerState)),
    mergeMap(({ payload }) => {
        setLs<boolean>('drawerState', payload);

        return of(systemActions.setDrawerState(payload));
    }),
    catchError((err) => of(systemActions.errorNotification(err.message)))
);
