import { of, merge } from 'rxjs';
import {
    filter,
    first,
    map,
    switchMap,
    catchError,
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';

export const getRouterItems: Epic = (action$, state$, { router }) => action$.pipe(
    filter(isActionOf(systemActions.getRouterItems)),
    switchMap(() => state$.pipe(
        first(),
        map(systemSelectors.permissions),
        map((permissions) => router.getRouterItems(permissions)),
        map(systemActions.setRouterItems),
        catchError((err, caught) => merge(
            caught,
            of(systemActions.errorNotification(err.message)),
        )),
    )),
);
