const bem = (str: string) => (el: string): string => str + '__' + el;

export default bem;
