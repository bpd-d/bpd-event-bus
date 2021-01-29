import { IBpdCollection, BpdCollectionPair } from "./interfaces";
export declare class BpdEventsCollection<T> implements IBpdCollection<T> {
    #private;
    constructor();
    add(key: string, value: T): void;
    remove(key: string): void;
    has(key: string): boolean;
    get(index: number): BpdCollectionPair<T> | null;
    first(): BpdCollectionPair<T> | null;
    length(): number;
    indexOf(key: string): number;
}
