import { are, is, counter, getContextArgumentId } from "./functions";
import { IBpdEventBus, BpdEventReceiver, IBpdEventEmitHandler, BpdEventLogger, ContextArgument, BpdEventBusSetup } from "./interfaces";
import { BpdCallbackExecutor } from "./executors";
import { ERROR, INFO } from "./statics";
import { BasicEventEmitHandler, ExtendedEventEmitHandler } from "./handlers";
import { BpdAsyncHandlePerformer, BpdBasicHandlePerformer } from "./performers";

export { BpdEventContext as CuiEventContext } from "./interfaces";

export class BpdEventBusFactory {
    static create(setup?: BpdEventBusSetup): IBpdEventBus {
        let executor = new BpdCallbackExecutor();
        let performer = setup?.policy === "tasked" ? new BpdAsyncHandlePerformer(executor) : new BpdBasicHandlePerformer(executor)
        let handler = setup?.handling === 'extended' ? new ExtendedEventEmitHandler(performer) : new BasicEventEmitHandler(performer);
        let bus = new BpdEventBus(handler, setup?.name);
        if (is(setup?.logger)) {
            bus.setLogger(setup.logger);
        }
        return bus;
    }
}

export class BpdEventBus implements IBpdEventBus {
    #events: { [event: string]: BpdEventReceiver }
    #eventHandler: IBpdEventEmitHandler;
    #logger: BpdEventLogger;
    #counter: Generator<number, void, unknown>;
    #name: string;
    constructor(emitHandler: IBpdEventEmitHandler, name?: string) {
        this.#events = {};
        this.#eventHandler = emitHandler;
        this.#counter = counter();
        this.#name = name ?? "EVENT_BUS";
    }

    setLogger(logger: BpdEventLogger) {
        this.#logger = logger;
    }
    /**
     * Attaches event to event bus
     * 
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {ContextArgument} ctx - callback context with id
     * @param {ContextArgument} target - optional - cui element which event shall be attached to
     */
    on(name: string, callback: any, ctx: ContextArgument, target?: ContextArgument): string {
        if (!are(name, callback)) {
            this.logError('on', "Missing argument")
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = this.prepareEventId(getContextArgumentId(ctx));

        this.logInfo("on", `Attaching new event: [${name}] for: [${id}]`)
        if (!this.#events[name]) {
            this.#events[name] = {}
        }

        this.#events[name][id] = { ctx: ctx, callback: callback, target: target }
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
            this.logError("detach", "Missing argument")
        }
        let ev = this.#events[name]
        let id = getContextArgumentId(ctx);
        this.logInfo("detach", `Detaching item: [${id}] from [${name}]`);
        if (this.isAttached(ev, id)) {
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
            this.logError("detachAll", "Event name is missing or incorrect")
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
            this.logInfo("emit", "Event name is incorrect")
        }
        let id = getContextArgumentId(target);
        this.logInfo("emit", `Emit: [${event}], id: [${id}]`);
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
        return this.isAttached(ev, getContextArgumentId(ctx))
    }

    private isAttached(ev: BpdEventReceiver, id: string): boolean {
        return is(ev) && is(id) && is(ev[id]);
    }

    private prepareEventId(ctx: string) {
        return is(ctx) ? ctx : this.getRandomEventId();
    }

    private logError(ctx: string, message?: string) {
        this.log(ERROR, ctx, message);
    }

    private logInfo(ctx: string, message?: string) {
        this.log(INFO, ctx, message);
    }

    private log(type: string, ctx: string, message?: string) {
        if (this.#logger) {
            this.#logger(type, ctx, new Date().toLocaleString(), message);
        }
    }

    private getRandomEventId(): string {
        return this.#name + "_" + this.#counter.next().value;
    }
}   