import { createAction } from 'typesafe-actions';

export const getDictionary = createAction('[SYSTEM] GET_DICTIONARY')<string[]>();
export const setDictionary = createAction('[SYSTEM] SET_DICTIONARY')<unknown>();
export const clearDictionary = createAction('[SYSTEM] CLEAR_DICTIONARY')();
