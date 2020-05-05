import { createReducer, getType } from 'typesafe-actions';
import { requestDrawerActions } from '@customer/store/actions';

const initialState = {
    openDrawer: false
};

interface DrawerTypes {
    openDrawer: boolean;
};

const requestDrawer = createReducer<DrawerTypes>(initialState, {
    [getType(requestDrawerActions.toggle)]: (state) => ({
        ...state,
        openDrawer: !state.openDrawer
    })
});

export { requestDrawer };
