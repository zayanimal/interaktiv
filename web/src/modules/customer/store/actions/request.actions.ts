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

export const changePriceList = createAction('[PROJECT_REQ] CHANGE_PRICE_LIST')<priceTypes[]>();
export const setSelectedModels = createAction('[PROJECT_REQ] SET_SELECTED_MODELS')<priceTypes[]>();
export const cleanPriceList = createAction('[PROJECT_REQ] CLEAN_PRICE_LIST')();

export const putModelInModelsSelected = createAction('[PROJECT_REQ] PUT_MODEL_IN_MODELS_SELECTED')<priceTypes | undefined>();
export const putModelInModelsData = createAction('[PROJECT_REQ] PUT_MODEL_IN_MODELS_DATA')<priceTypes | undefined>();

export const putModelInOrder = createAction('[PROJECT_REQ] PUT_MODEL_IN_ORDER')<priceTypes | undefined>();
export const deleteModelInOrder = createAction('[PROJECT_REQ] DELETE_MODEL_IN_ORDER')<priceTypes[]>();
