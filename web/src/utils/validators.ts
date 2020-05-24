export const validation = {
    empty(value: string) {
        return value.length === 0;
    },

    length(value: string, size: number) {
        return value.length > size;
    },

    translit(value: string) {
        return /[a-z]/gmi.test(value);
    }
};
