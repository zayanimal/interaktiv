import { createReducer, getType } from 'typesafe-actions';
import { fetchPriceList, cleanPriceList, putModelInOrder } from '@actions/projectRequest.actions';

export interface priceTypes {
    model: string;
    price: number;
}

interface projectRequestTypes {
    rate: number;
    modelsData: priceTypes[];
    modelsDataInOrder: priceTypes[];
}

const initialState = {
    rate: 0,
    modelsData: [],
    modelsDataInOrder: []
};

const projectRequestReducer = createReducer<projectRequestTypes>(initialState, {
    [getType(fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),
    [getType(cleanPriceList)]: state => ({
        ...state,
        modelsData: []
    }),
    [getType(putModelInOrder)]: (state, { payload }) => ({
        ...state,
        modelsDataInOrder: [...state.modelsDataInOrder, payload]
    })
});

export default projectRequestReducer;
