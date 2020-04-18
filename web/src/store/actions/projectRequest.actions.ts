import { createAction, createAsyncAction } from 'typesafe-actions';

interface priceTypes {
    model: string;
    price: number | string;
}

interface priceRateTypes {
    rate: number;
    price: priceTypes[];
}

export const fetchPriceList = createAsyncAction(
    '[PROJECT_REQ] FETCH_PRICE_REQUEST',
    '[PROJECT_REQ] FETCH_PRICE_SUCCESS',
    '[PROJECT_REQ] FETCH_PRICE_FAILURE'
)<undefined, priceRateTypes, string>();

export const cleanPriceList = createAction('[PROJECT_REQ] CLEAN_PRICE_LIST')();

export const putModelInOrder = createAction('[PROJECT_REQ] PUT_MODEL_IN_ORDER')<priceTypes | undefined>();
