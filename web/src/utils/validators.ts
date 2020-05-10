export const validation = {
    empty(value: string) {
        return (value.length === 0 ? true : false);
    },

    length(value: string, size: number) {
        return (value.length > size ? true : false);
    },

    translit(value: string) {
        return (/[a-z]/gmi.test(value) ? true : false);
    }
};
