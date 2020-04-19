import { createReducer, getType } from 'typesafe-actions';
import {
    fetchPriceList,
    changePriceList,
    setSelectedModels,
    cleanPriceList,
    putModelInOrder,
    putModelInModelsSelected,
    putModelInModelsData,
    deleteModelInOrder
} from '@actions/projectRequest.actions';

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

const projectRequestReducer = createReducer<projectRequestTypes>(initialState, {
    [getType(fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),
    [getType(changePriceList)]: (state, { payload }) => ({
        ...state,
        modelsData: payload
    }),
    [getType(cleanPriceList)]: state => ({
        ...state,
        modelsData: []
    }),
    [getType(putModelInModelsData)]: (state, { payload }) => ({
        ...state,
        modelsData: [...state.modelsData, payload].sort()
    }),
    [getType(putModelInModelsSelected)]: (state, { payload }) => ({
        ...state,
        modelsSelected: [...state.modelsSelected, payload].sort()
    }),
    [getType(setSelectedModels)]: (state, { payload }) => ({
        ...state,
        modelsSelected: payload
    }),
    [getType(putModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: [...state.modelsDataInOrder, payload]
    }),
    [getType(deleteModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: payload
    })
});

export default projectRequestReducer;
