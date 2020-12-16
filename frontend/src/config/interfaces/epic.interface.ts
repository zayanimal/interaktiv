import { Observable } from 'rxjs';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Action } from 'redux';
import { Dependencies } from '@config/dependencies';

export interface Epic<
    Input extends Action = any,
    Output extends Input = Input> {
    (
        action$: ActionsObservable<Input>,
        state$: StateObservable<any>,
        dependencies: Dependencies
    ): Observable<Output>;
}
