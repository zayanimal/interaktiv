import { RestService, restService } from '@system/services/rest.service';
import { DictionaryPayload } from '@system/interfaces/dictionary.interface';

class DictionaryService {
    constructor(private api: RestService) {}

    get$({ type, names }: DictionaryPayload) {
        return this.api.get$(`dictionary/${type}?dicts=${names.join('%')}`);
    }
}

export const dictionaryService = new DictionaryService(restService);
