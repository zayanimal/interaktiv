export const bem = (str: string) => (el: string): string => str + '__' + el;
export const numToRub = (n: number): string => n.toLocaleString('ru', { style: 'currency', currency: 'RUB'});
export const numToUsd = (n: number): string => n.toLocaleString('ru', { style: 'currency', currency: 'USD'});
