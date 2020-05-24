import { createReducer, getType } from 'typesafe-actions';
import { requestActions } from '@customer/store/actions';

export interface priceTypes {
    id: number;
    model: string;
    price: number;
}

export interface priceTypesCount extends priceTypes {
    count: number;
}

interface projectRequestTypes {
    rate: number;
    partnumber: string,
    modelsData: priceTypes[];
    modelsDataInOrder: priceTypesCount[];
    modelsSelected: priceTypes[];
    showList: boolean;
}

const initialState = {
    rate: 0,
    partnumber: '',
    modelsData: [],
    modelsDataInOrder: [],
    modelsSelected: [],
    showList: false
};

const request = createReducer<projectRequestTypes>(initialState, {
    [getType(requestActions.fetchPriceList.success)]: (state, { payload }) => ({
        ...state,
        rate: payload.rate.Valute.USD.Value,
        modelsData: payload.price
    }),

    [getType(requestActions.cleanPriceList)]: state => ({
        ...state,
        modelsData: [],
        modelsSelected: []
    }),

    [getType(requestActions.setPartnumber)]: (state, { payload }) => ({
        ...state,
        partnumber: payload
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
        partnumber: '',
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
