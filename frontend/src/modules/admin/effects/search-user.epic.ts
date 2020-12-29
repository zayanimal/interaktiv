import { of, merge } from 'rxjs';
import {
    filter,
    map,
    mapTo,
    mergeMap,
    switchMap,
    switchMapTo,
    first,
    catchError,
} from 'rxjs/operators';
import { Epic } from '@config/interfaces';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { searchUserActions } from '@admin/store/actions';
import { companyControlSelectors } from '@admin/store/selectors';


/**
 * Получить список компаний с пагинацией
 * @param action$
 * @param state$
 * @param services
 */
export const searchUser: Epic = (action$, _, { users }) => action$.pipe(
    filter(isActionOf(searchUserActions.searchUser)),
    // mergeMap(({ payload }) => {})
);
