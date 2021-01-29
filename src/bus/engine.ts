import { are, is, counter, getContextArgumentId } from "../core/functions";
import { IBpdEventBus, BpdEventReceiver, IBpdEventEmitHandler, BpdEventLoggerCallback, ContextArgument, BpdEventBusSetup, BpdEventDetails, IBpdEventBusInstanceSetup, IBpdLoggable, IBpdBusMapping } from "../core/interfaces";
import { BpdCallbackExecutor } from "../core/executors";
import { BpdEventEmitHandlerFactory } from "../bus/handlers";
import { getPerformer } from "../bus/performers";
import { ArgumentError } from "../core/errors";
import { BpdEventBusLogging, IBpdEventBusLogging } from "../core/logger";
import { getDefaultBusSetup } from "./statics";
export { BpdEventContext as CuiEventContext } from "../core/interfaces";

export class BpdEventBusFactory {
    static create(setup?: BpdEventBusSetup): IBpdEventBus {
        if (!setup || !setup.queue || setup.queue.length === 0) {
            return initBusInstance(getDefaultBusSetup());
        }
        let bus = new BpdEventBusFarm(setup.queue, setup.logger);
        return bus;
    }
}

export class BpdEventBus implements IBpdEventBus {
    #events: { [event: string]: BpdEventReceiver }
    #eventHandler: IBpdEventEmitHandler;
    #logger: IBpdEventBusLogging;
    #counter: Generator<number, void, unknown>;
    #name: string;
    constructor(emitHandler: IBpdEventEmitHandler, name: string, logCallback?: BpdEventLoggerCallback) {
        this.#events = {};
        this.#eventHandler = emitHandler;
        this.#counter = counter();
        this.#name = name ?? "EVENT_BUS";
        this.#logger = new BpdEventBusLogging(logCallback);
    }

    /**
     * Attaches event to event bus
     * 
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {ContextArgument} ctx - callback context with id
     * @param {ContextArgument} target - optional - cui element which event shall be attached to
     */
    on(name: string, callback: any, context?: BpdEventDetails): string {
        if (!are(name, callback)) {
            this.#logger.error('on', "Missing argument")
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = this.prepareEventId(getContextArgumentId(context?.ctx));

        this.#logger.info("on", `Attaching new event: [${name}] for: [${id}]`)
        if (!this.#events[name]) {
            this.#events[name] = {}
        }

        this.#events[name][id] = { ctx: context?.ctx, callback: callback, target: context?.target }
        return id;
    }

    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    detach(name: string, ctx: ContextArgument): void {
        if (!is(name)) {
            this.#logger.error("detach", "Missing argument")
        }
        let ev = this.#events[name]
        let id = getContextArgumentId(ctx);
        this.#logger.info("detach", `Detaching item: [${id}] from [${name}]`);
        if (is(id) && this.isAttached(ev, id)) {
            // @ts-ignore already checked 
            delete ev[id];
        }
    }

    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void {
        if (is(name) && this.#events[name]) {
            delete this.#events[name]
        } else {
            this.#logger.error("detachAll", "Event name is missing or incorrect")
        }
    }

    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    async emit(event: string, target: ContextArgument, ...args: any[]): Promise<boolean> {
        if (!is(event)) {
            throw new ArgumentError("Event name is incorrect");
        }
        let id = getContextArgumentId(target);
        this.#logger.info("emit", `Emit: [${event}], id: [${id}]`);
        await this.#eventHandler.handle(event, this.#events[event], id, args)
        return true;
    }

    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    isSubscribing(name: string, ctx: ContextArgument) {
        let ev = this.#events[name]
        return this.isAttached(ev, getContextArgumentId(ctx));
    }

    private isAttached(ev: BpdEventReceiver, id: string | null): boolean {
        //@ts-ignore id already checked
        return is(ev) && is(id) && is(ev[id]);
    }

    private prepareEventId(ctx: string | null): string {
        //@ts-ignore id already checked
        return is(ctx) ? ctx : this.getRandomEventId();
    }

    private getRandomEventId(): string {
        return this.#name + "_" + this.#counter.next().value;
    }
}

export class BpdEventBusFarm implements IBpdEventBus {
    #events: { [event: string]: number };
    #buses: IBpdEventBus[];
    #last: number;
    #logger: IBpdEventBusLogging;
    #ctx: string;
    constructor(setup: IBpdEventBusInstanceSetup[], logCallback?: BpdEventLoggerCallback) {
        this.#ctx = "EXT";
        this.#logger = new BpdEventBusLogging(logCallback);
        this.#buses = [];
        this.#events = {};
        this.#last = 0;
        if (is(setup)) {
            this.#logger.info(this.#ctx, "Initiating buses")
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority
            })
            sorted.forEach((item, index) => {
                this.#buses.push(initBusInstance(item, logCallback))
                this.#events = {
                    ...this.#events,
                    ...this.mapEvents(item.eventsDef, index),
                }
                this.#logger.info(this.#ctx, `Bus ${item.name} has been initialized with number: ${index}`)
            })

            this.#buses.push(initBusInstance(getDefaultBusSetup(), logCallback))
            this.#last = this.#buses.length - 1;
            this.#logger.info(this.#ctx, `Bus initialization finished`);
        }
    }

    /**
     * Attaches event to event bus
     * 
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {BpdEventDetails} ctx - callback context with id
     */
    on(name: string, callback: any, ctx?: BpdEventDetails): string | null {

        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument")
        }
        return this.get(name).on(name, callback, ctx);
    }

    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    detach(name: string, ctx: ContextArgument): void {
        if (!are(name, ctx)) {
            throw new ArgumentError("Missing argument")
        }
        this.get(name).detach(name, ctx);
    }

    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void {
        this.get(name).detachAll(name);
    }

    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    async emit(event: string, context: ContextArgument, ...args: any[]): Promise<boolean> {
        if (!is(event)) {
            throw new ArgumentError("Event name is incorrect");
        }
        return this.get(event).emit(event, context, ...args);
    }

    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    isSubscribing(name: string, ctx?: ContextArgument) {
        return this.get(name).isSubscribing(name, ctx);
    }

    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    private mapEvents(events: string[], index: number): IBpdBusMapping {
        return events.reduce((result: IBpdBusMapping, current: string) => {
            if (!result[current]) {
                return {
                    ...result,
                    [current]: index
                }
            }
            return result;
        }, {})
    }

    /**
     * Retrives porper event bus based on event name
     * @param event 
     */
    private get(event: string): IBpdEventBus {
        let idx = this.#events[event];
        return this.#buses[idx ?? this.#last];
    }
}


/**
 * Function that initiates single bus insatnce 
 * @param setup 
 * @param logger 
 */
function initBusInstance(setup: IBpdEventBusInstanceSetup, logCallback?: BpdEventLoggerCallback): IBpdEventBus {
    if (!are(setup.name, setup.handling)) {
        throw new ArgumentError("Bus name or handler name is incorrect");
    }
    let executor = new BpdCallbackExecutor();
    let performer = getPerformer(executor, setup.policy);
    let handler = BpdEventEmitHandlerFactory.get(setup.handling ?? "", performer, logCallback);
    const bus = new BpdEventBus(handler, setup.name, logCallback);
    return bus;
}