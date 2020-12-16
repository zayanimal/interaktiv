import { RestService } from '@system/services/rest.service';
import { DictionaryPayload } from '@system/interfaces/dictionary.interface';

export class DictionaryService {
    constructor(private readonly api: RestService) {}

    get$({ type, names }: DictionaryPayload) {
        return this.api.get$(`dictionary/${type}?dicts=${names.join('%')}`);
    }
}
