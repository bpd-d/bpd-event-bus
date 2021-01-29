export interface BpdEventContext {
    eventId: string;
}
export interface IBpdBusMapping {
    [name: string]: number;
}
export interface BpdEventDetails {
    ctx?: ContextArgument;
    target?: ContextArgument;
}
export interface IBpdEventBus {
    on(name: string, callback: any, context?: BpdEventDetails): string | null;
    detach(name: string, ctx: ContextArgument): void;
    detachAll(name: string): void;
    emit(event: string, ctx: ContextArgument, ...args: any[]): Promise<boolean>;
    isSubscribing(name: string, ctx?: ContextArgument): boolean;
}
export interface IBpdLoggable {
    setLogger(logger?: BpdEventLoggerCallback): void;
}
export interface IBpdCallbackExecutor {
    execute(callback: any, ctx: any, args: any[]): Promise<void>;
}
export interface BpdEventObj {
    ctx: ContextArgument | undefined;
    callback: any;
    target: ContextArgument | undefined;
}
export interface BpdEventReceiver {
    [id: string]: BpdEventObj;
}
export interface IBpdEventEmitHandler {
    handle(event: string, receiver: BpdEventReceiver, id: string | null, args: any[]): Promise<boolean>;
}
export interface BpdEventLoggerCallback {
    (type: string, context: string, date: string, message?: string): void;
}
export interface BpdEventCollection<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
}
export interface BpdEventBusSetup {
    logger?: BpdEventLoggerCallback;
    queue?: IBpdEventBusInstanceSetup[];
}
export interface BpdCollectionPair<T> {
    key: string;
    value?: T;
}
export interface IBpdCollection<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    has(key: string): boolean;
    get(index: number): BpdCollectionPair<T> | null;
    first(): BpdCollectionPair<T> | null;
    indexOf(key: string): number;
    length(): number;
}
export interface IBpdHandlerPerformer {
    perform(data: EmitHandlerData): Promise<boolean>;
}
export interface EmitHandlerData {
    events: BpdEventReceiver;
    id: string | null;
    args: any[];
}
export interface IBpdEventBusInstanceSetup {
    name: string;
    policy?: "simple" | "tasked";
    handling?: "basic" | "extended";
    eventsDef: string[];
    priority: number;
}
export declare type ContextArgument = BpdEventContext | string;
