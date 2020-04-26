import { createReducer, getType } from 'typesafe-actions';
import { request } from '@customer/store/actions';

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
    [getType(request.fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),
    [getType(request.changePriceList)]: (state, { payload }) => ({
        ...state,
        modelsData: payload
    }),
    [getType(request.cleanPriceList)]: state => ({
        ...state,
        modelsData: [],
        modelsSelected: []
    }),
    [getType(request.putModelInModelsData)]: (state, { payload }) => ({
        ...state,
        modelsData: [...state.modelsData, payload].sort()
    }),
    [getType(request.putModelInModelsSelected)]: (state, { payload }) => ({
        ...state,
        modelsSelected: [...state.modelsSelected, payload].sort()
    }),
    [getType(request.setSelectedModels)]: (state, { payload }) => ({
        ...state,
        modelsSelected: payload
    }),
    [getType(request.putModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: [...state.modelsDataInOrder, payload]
    }),
    [getType(request.deleteModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: payload
    })
});

export { requestReducer };
