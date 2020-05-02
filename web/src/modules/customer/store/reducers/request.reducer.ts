import { createReducer, getType } from 'typesafe-actions';
import { requestActions } from '@customer/store/actions';

export interface priceTypes {
    model: string;
    price: number;
}

interface projectRequestTypes {
    rate: number;
    modelsData: priceTypes[];
    modelsDataInOrder: priceTypes[];
    modelsSelected: priceTypes[];
}

const initialState = {
    rate: 0,
    modelsData: [],
    modelsDataInOrder: [],
    modelsSelected: [],
};

const requestReducer = createReducer<projectRequestTypes>(initialState, {
    [getType(requestActions.fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),
    [getType(requestActions.changePriceList)]: (state, { payload }) => ({
        ...state,
        modelsData: payload
    }),
    [getType(requestActions.cleanPriceList)]: state => ({
        ...state,
        modelsData: [],
        modelsSelected: []
    }),
    [getType(requestActions.putModelInModelsData)]: (state, { payload }) => ({
        ...state,
        modelsData: [...state.modelsData, payload].sort()
    }),
    [getType(requestActions.putModelInModelsSelected)]: (state, { payload }) => ({
        ...state,
        modelsSelected: [...state.modelsSelected, payload].sort()
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
    })
});

export { requestReducer };
