export class FoundBuffer {
    list: string[] = [];
    found: string[] = [];

    push(name: string) {
        if (this.list.some((value) => value === name)) {
            this.found.push(name);
        } else {
            this.list.push(name);
        }
    }

    check(name: string) {
        return this.found.some((value) => value === name);
    }

    clear() {
        this.list.length = 0;
        this.found.length = 0;
    }
}
