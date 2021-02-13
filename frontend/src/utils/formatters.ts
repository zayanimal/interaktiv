export const bem = (str: string, type = '__') => (
    el?: string,
    modifier?: string
) => {
    const element = el ? `${str}${type}${el}` : str;

    if (modifier) {
        return `${element} ${element}_${modifier}`;
    }

    return element;
};
export const classes = (...cls: (string | undefined)[]) => cls.join(' ').trim();
export const numToRub = (n: number): string =>
    n.toLocaleString('ru', { style: 'currency', currency: 'RUB' });
export const numToUsd = (n: number): string =>
    n.toLocaleString('ru', { style: 'currency', currency: 'USD' });
