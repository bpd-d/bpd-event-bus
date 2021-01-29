import { BpdEventLoggerCallback } from "./interfaces";
import { ERROR, INFO } from "./statics";

export interface IBpdEventBusLogging {
    error(ctx: string, message?: string): void;
    info(ctx: string, message?: string): void;
    set(logger: BpdEventLoggerCallback): void;
    get(): BpdEventLoggerCallback | undefined;
}

export class BpdEventBusLogging implements IBpdEventBusLogging {
    #logger: BpdEventLoggerCallback | undefined;

    constructor(logger?: BpdEventLoggerCallback) {
        this.#logger = logger;
    }

    set(logger?: BpdEventLoggerCallback) {
        this.#logger = logger;
    }

    get() {
        return this.#logger;
    }

    error(ctx: string, message?: string) {
        this.log(ERROR, ctx, message);
    }

    info(ctx: string, message?: string) {
        this.log(INFO, ctx, message);
    }

    private log(type: string, ctx: string, message?: string) {
        if (this.#logger) {
            this.#logger(type, ctx, new Date().toLocaleString(), message);
        }
    }
}