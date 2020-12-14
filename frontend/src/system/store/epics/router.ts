import { of, merge } from 'rxjs';
import {
    filter,
    first,
    map,
    switchMap,
    catchError,
} from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';
import { routerService } from '@system/services/router.service';

export const getRouterItems: Epic = (action$, state$) => action$.pipe(
    filter(isActionOf(systemActions.getRouterItems)),
    switchMap(() => state$.pipe(
        first(),
        map(systemSelectors.permissions),
        map((permissions) => routerService.getRouterItems(permissions)),
        map(systemActions.setRouterItems),
        catchError((err, caught) => merge(
            of(systemActions.errorNotification(err.message)),
            caught,
        )),
    )),
);
