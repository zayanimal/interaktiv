import { RestService } from '@system/services/rest.service';
import { IDictionaryService, DictionaryPayload } from '@system/interfaces';

export class DictionaryService implements IDictionaryService {
    constructor(private readonly api: RestService) {}

    public get$({ type, names }: DictionaryPayload) {
        return this.api.get$(`dictionary/${type}?dicts=${names.join('%')}`);
    }
}
