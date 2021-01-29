import { BpdEventLoggerCallback } from "./interfaces";
export interface IBpdEventBusLogging {
    error(ctx: string, message?: string): void;
    info(ctx: string, message?: string): void;
    set(logger: BpdEventLoggerCallback): void;
    get(): BpdEventLoggerCallback | undefined;
}
export declare class BpdEventBusLogging implements IBpdEventBusLogging {
    #private;
    constructor(logger?: BpdEventLoggerCallback);
    set(logger?: BpdEventLoggerCallback): void;
    get(): BpdEventLoggerCallback | undefined;
    error(ctx: string, message?: string): void;
    info(ctx: string, message?: string): void;
    private log;
}
