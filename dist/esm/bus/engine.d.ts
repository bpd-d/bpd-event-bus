import { IBpdEventBus, IBpdEventEmitHandler, BpdEventLoggerCallback, ContextArgument, BpdEventBusSetup, BpdEventDetails, IBpdEventBusInstanceSetup } from "../core/interfaces";
export { BpdEventContext as CuiEventContext } from "../core/interfaces";
export declare class BpdEventBusFactory {
    static create(setup?: BpdEventBusSetup): IBpdEventBus;
}
export declare class BpdEventBus implements IBpdEventBus {
    #private;
    constructor(emitHandler: IBpdEventEmitHandler, name: string, logCallback?: BpdEventLoggerCallback);
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {ContextArgument} ctx - callback context with id
     * @param {ContextArgument} target - optional - cui element which event shall be attached to
     */
    on(name: string, callback: any, context?: BpdEventDetails): string;
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    detach(name: string, ctx: ContextArgument): void;
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void;
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event: string, target: ContextArgument, ...args: any[]): Promise<boolean>;
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    isSubscribing(name: string, ctx: ContextArgument): boolean;
    private isAttached;
    private prepareEventId;
    private getRandomEventId;
}
export declare class BpdEventBusFarm implements IBpdEventBus {
    #private;
    constructor(setup: IBpdEventBusInstanceSetup[], logCallback?: BpdEventLoggerCallback);
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {BpdEventDetails} ctx - callback context with id
     */
    on(name: string, callback: any, ctx?: BpdEventDetails): string | null;
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    detach(name: string, ctx: ContextArgument): void;
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void;
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event: string, context: ContextArgument, ...args: any[]): Promise<boolean>;
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    isSubscribing(name: string, ctx?: ContextArgument): boolean;
    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    private mapEvents;
    /**
     * Retrives porper event bus based on event name
     * @param event
     */
    private get;
}
