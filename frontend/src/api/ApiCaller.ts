export class ApiCaller {
    url: string;
    constructor(url = '') {
        this.url = url;
    }

    async get() {
        return await fetch(this.url);
    }
}