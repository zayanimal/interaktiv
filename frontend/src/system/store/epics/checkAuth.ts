import { filter, map } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { systemActions } from '@system/store/actions';
import { tokenService } from '@system/services/token.service';

export const checkAuth: Epic = (action$) => action$.pipe(
    filter(isActionOf(systemActions.checkAuth)),
    map(() => systemActions.setAuth(tokenService.isLoggedIn())),
);
