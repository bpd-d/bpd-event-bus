import { IBpdCollection, BpdCollectionPair } from "./interfaces";
import { is } from "./functions";

export class BpdEventsCollection<T> implements IBpdCollection<T> {
    #keys: string[];
    #values: T[];
    constructor() {
        this.#keys = []
        this.#values = []
    }


    add(key: string, value: T): void {
        if (is(key) && !this.has(key)) {
            this.#keys.push(key);
            this.#values.push(value);
        }
    }

    remove(key: string): void {
        if (is(key) && this.has(key)) {
            let index = this.indexOf(key);
            if (index > -1) {
                this.#keys.splice(index, 1);
                this.#values.splice(index, 1);
            }
        }
    }

    has(key: string): boolean {
        return this.#keys.includes(key);
    }

    get(index: number): BpdCollectionPair<T> {
        if (index > -1 && index < this.length()) {
            return {
                key: this.#keys[index],
                value: this.#values[index]
            }
        }
        return null;
    }

    first(): BpdCollectionPair<T> {
        return this.get(0);
    }

    length(): number {
        return this.#keys.length;
    }

    indexOf(key: string): number {
        return this.#keys.indexOf(key);
    }

}