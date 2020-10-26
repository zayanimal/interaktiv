import { createAction, createAsyncAction } from 'typesafe-actions';

interface priceTypes {
    id: number;
    model: string;
    price: number | string;
}

interface priceTypesCount extends priceTypes {
    count: number;
}

interface priceRateTypes {
    rate: number;
    price: priceTypes[];
}

export const fetchPriceList = createAsyncAction(
    '[CUSTOMER] FETCH_PRICE_REQUEST',
    '[CUSTOMER] FETCH_PRICE_SUCCESS',
    '[CUSTOMER] FETCH_PRICE_FAILURE'
)<undefined, priceRateTypes, string>();

export const setModelInputValue = createAction('[CUSTOMER] SET_MODEL_INPUT_VALUE')<string>();

export const sendNewProject = createAction('[CUSTOMER] SEND_NEW_PROJECT_DATA')();
export const completeData = createAction('[CUSTOMER] COMPLETE')();

export const filterModels = createAction('[CUSTOMER] FILTER_MODELS')<string>();
export const setSelectedModels = createAction('[CUSTOMER] SET_SELECTED_MODELS')<priceTypes[]>();
export const cleanPriceList = createAction('[CUSTOMER] CLEAN_PRICE_LIST')();

export const putModelInOrder = createAction('[CUSTOMER] PUT_MODEL_IN_ORDER')<priceTypesCount | undefined>();
export const deleteModelInOrder = createAction('[CUSTOMER] DELETE_MODEL_IN_ORDER')<priceTypesCount[]>();
export const updateModelInOrder = createAction('[CUSTOMER] UPDATE_MODEL_IN_ORDER')<priceTypesCount[]>();
export const clearOrder = createAction('[CUSTOMER] CLEAR_ORDER')();
export const showList = createAction('[CUSTOMER] REQUEST_SHOW_LIST')<boolean>();
