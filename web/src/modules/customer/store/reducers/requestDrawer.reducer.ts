import { createReducer, getType } from 'typesafe-actions';
import { requestDrawerActions } from '@customer/store/actions';

const initialState = {
    openDrawer: false
};

interface DrawerTypes {
    openDrawer: boolean;
};

const requestDrawer = createReducer<DrawerTypes>(initialState, {
    [getType(requestDrawerActions.open)]: (state) => ({
        ...state,
        openDrawer: true
    }),
    [getType(requestDrawerActions.close)]: (state) => ({
        ...state,
        openDrawer: false
    })
});

export { requestDrawer };
