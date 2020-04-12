import { createAsyncAction } from 'typesafe-actions';

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
