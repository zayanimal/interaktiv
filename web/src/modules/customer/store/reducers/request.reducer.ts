import { requestActions } from '@customer/store/actions';
import { createReducer, getType } from 'typesafe-actions';

export interface priceTypes {
    id: number;
    model: string;
    price: number;
}

export interface priceTypesCount extends priceTypes {
    count: number;
}

interface InitialState {
    rate: number;
    clearPartnumber: boolean,
    modelsData: priceTypes[];
    modelsDataInOrder: priceTypesCount[];
    modelsSelected: priceTypes[];
    showList: boolean;
}

const initialState = {
    rate: 0,
    clearPartnumber: false,
    modelsData: [],
    modelsDataInOrder: [],
    modelsSelected: [],
    showList: false
};

const request = createReducer<InitialState>(initialState, {
    [getType(requestActions.fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),

    [getType(requestActions.cleanPriceList)]: (state) => ({
        ...state,
        modelsData: [],
        modelsSelected: []
    }),

    [getType(requestActions.clearInputPartnumber)]: (state) => ({
        ...state,
        clearPartnumber: false
    }),

    [getType(requestActions.setSelectedModels)]: (state, { payload }) => ({
        ...state,
        modelsSelected: payload
    }),

    [getType(requestActions.putModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: [...state.modelsDataInOrder, payload]
    }),

    [getType(requestActions.deleteModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: payload
    }),

    [getType(requestActions.updateModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: payload
    }),

    [getType(requestActions.clearOrder)]: (state) => ({
        ...state,
        clearPartnumber: true,
        modelsDataInOrder: [],
        modelsSelected: [],
        showList: false
    }),

    [getType(requestActions.showList)]: (state, { payload }) => ({
        ...state,
        showList: payload
    })
});

export { request };
