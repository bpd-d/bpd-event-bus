export interface BpdEventContext {
    id: string;
}
export interface BpdEventDetails {
    ctx?: ContextArgument;
    target?: ContextArgument;
}

export interface IBpdEventBus {
    on(name: string, callback: any, context?: BpdEventDetails): string;
    detach(name: string, ctx: ContextArgument): void;
    detachAll(name: string): void;
    emit(event: string, ctx: ContextArgument, ...args: any[]): Promise<boolean>;
    isSubscribing(name: string, ctx?: ContextArgument): boolean;
}

export interface IBpdCallbackExecutor {
    execute(callback: any, ctx: any, args: any[]): Promise<void>;
}

export interface BpdEventObj {
    ctx: any;
    callback: any;
    target: BpdEventContext | string;
}

export interface BpdEventReceiver {
    [id: string]: BpdEventObj;
}

export interface IBpdEventEmitHandler {
    handle(event: string, receiver: BpdEventReceiver, id: string, args: any[]): Promise<boolean>;
}

export interface BpdEventLogger {
    (type: string, context: string, date: string, message?: string): void;
}

export interface BpdEventCollection<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
}

export interface BpdEventBusSetup {
    name?: string;
    logger?: BpdEventLogger;
    policy?: "simple" | "tasked";
    handling?: "basic" | "extended";
}

export interface BpdCollectionPair<T> {
    key: string;
    value?: T;
}

export interface IBpdCollection<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    has(key: string): boolean;
    get(index: number): BpdCollectionPair<T>;
    first(): BpdCollectionPair<T>;
    indexOf(key: string): number;
    length(): number;
}

export interface IBpdHandlerPerformer {
    perform(data: EmitHandlerData): Promise<boolean>;
}

export interface EmitHandlerData {
    events: BpdEventReceiver;
    id: string;
    args: any[];
}




export type ContextArgument = BpdEventContext | string;