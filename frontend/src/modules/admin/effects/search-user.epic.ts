import { of, merge } from 'rxjs';
import {
    filter,
    map,
    mergeMap,
    pluck,
    debounceTime,
    catchError,
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { searchUserActions } from '@admin/store/actions';

/**
 * Найти пользователя
 * @param action$
 * @param state$
 * @param services
 */
export const searchUser: Epic = (action$, _, { users }) => action$.pipe(
    filter(isActionOf(searchUserActions.searchUser)),
    debounceTime(500),
    pluck('payload'),
    mergeMap((username) => (!username
        ? of(searchUserActions.setFound([]))
        : users.search$(username).pipe(
            pluck('response'),
            map((user) => (user.length
                ? searchUserActions.setFound(user)
                : searchUserActions.setFound([])
            )),
        )
    )),
    catchError((err, caught) => merge(
        caught,
        of(searchUserActions.setFound([])),
        of(systemActions.errorNotification(err.message)),
    )),
);
