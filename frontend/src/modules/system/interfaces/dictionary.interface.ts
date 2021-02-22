export interface Dictionary {
    id: string;
    name: string;
}

export interface DictionaryPayload {
    type: string;
    names: string[];
}
