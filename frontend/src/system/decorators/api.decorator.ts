export function ApiUrl(url: string) {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor { url = url; };
    };
}
