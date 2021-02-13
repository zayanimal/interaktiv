export function ApiUrl(url: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            url = url;
        };
    };
}
