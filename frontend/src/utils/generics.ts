/**
 * Исключить типа в зависимости от условия
 */
export type FilterFlags<Base, Condition> = {
    [Key in keyof Base]:
    Base[Key] extends Condition ? Key : never
};

/**
 * Привести обычную сущность к нормализованному типу
 */
export type NormalisedEntity<T> = { [key: string]: FilterFlags<T, string> }
