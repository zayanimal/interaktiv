import { createReducer, getType } from 'typesafe-actions';
import { fetchPriceList } from '@actions/projectRequest.actions';

export interface priceTypes {
    model: string;
    price: number;
}

interface projectRequestTypes {
    rate: number;
    modelsData: priceTypes[];
    order: priceTypes[];
}

const initialState = {
    rate: 0,
    modelsData: [],
    order: []
};

const projectRequestReducer = createReducer<projectRequestTypes>(initialState, {
    [getType(fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),

});

export default projectRequestReducer;
