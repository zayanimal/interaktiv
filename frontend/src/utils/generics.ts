/** Исключить типа в зависимости от условия */
export type FilterFlags<B, C> = {
    [K in keyof B]: B[K] extends C ? K : never
};

/** Привести обычную сущность к нормализованному типу */
export type Normalised<T> = { [key: string]: {
    [K in keyof T]: T[K] extends string ? K : string[];
} }
