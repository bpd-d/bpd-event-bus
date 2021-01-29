import { BpdEventReceiver, IBpdEventEmitHandler, BpdEventLoggerCallback, IBpdCollection, IBpdHandlerPerformer, EmitHandlerData } from "../core/interfaces";
declare abstract class EmitHandlerBase {
    #private;
    isBusy: boolean;
    queue: IBpdCollection<EmitHandlerData>;
    constructor(type: string, performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback);
    handle(event: string, events: BpdEventReceiver, id: string | null, args: any[]): Promise<boolean>;
    protected nextId(): string;
    protected abstract createKey(event: string, args: any[]): string;
}
export declare class BasicEventEmitHandler extends EmitHandlerBase implements IBpdEventEmitHandler {
    constructor(performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback);
    createKey(eventName: string, args: any[]): string;
}
export declare class ExtendedEventEmitHandler extends EmitHandlerBase implements IBpdEventEmitHandler {
    constructor(performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback);
    createKey(eventName: string, args: any[]): string;
}
export declare class BpdEventEmitHandlerFactory {
    static get(name: string, performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback): IBpdEventEmitHandler;
}
export {};
