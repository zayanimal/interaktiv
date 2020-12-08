/**
 * Утилита приведения строки к типу группы сериалайзера
 * @param value название группы
 */
export const groupSerial = (value: string) => ({
    groups: [value],
    concat({ groups }: { groups: string[] }) {
        this.groups = this.groups.concat(groups);
        return this;
    }
});
