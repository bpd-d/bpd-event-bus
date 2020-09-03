import { BpdEventReceiver, IBpdEventEmitHandler, IBpdCallbackExecutor, BpdEventLogger, IBpdCollection, IBpdHandlerPerformer, EmitHandlerData } from "./interfaces";
import { is, getContextArgumentId, counter } from "./functions";
import { INFO, ERROR } from "./statics";
import { BpdEventsCollection } from "./collection";



abstract class EmitHandlerBase {
    isBusy: boolean;
    queue: IBpdCollection<EmitHandlerData>;
    #logger: BpdEventLogger;
    #type: string;
    #counter: Generator<number, void, unknown>;
    #performer: IBpdHandlerPerformer;
    constructor(type: string, performer: IBpdHandlerPerformer, logger?: BpdEventLogger) {
        this.queue = new BpdEventsCollection();
        this.#performer = performer;
        this.isBusy = false;
        this.#logger = logger;
        this.#type = type;
        this.#counter = counter();
    }

    async handle(event: string, events: BpdEventReceiver, id: string, args: any[]): Promise<boolean> {
        if (!is(events)) {
            this.logError("handle", "No events provided")
            return
        }
        let key = this.createKey(event, args);
        this.queue.add(key, {
            events: events,
            id: id,
            args: args
        })

        if (!this.isBusy) {
            this.isBusy = true;
            let queueItem = null;
            while (this.queue.length() > 0) {
                queueItem = this.queue.first();
                try {
                    await this.#performer.perform(queueItem.value);
                } catch (e) {
                    this.logError("perform", e.message)
                } finally {
                    this.queue.remove(queueItem.key);
                }

            }
            this.isBusy = false;
        }
        return true;
    }


    protected logEvent(context: string, message?: string) {
        this.log(INFO, context, message)
    }

    protected logError(context: string, message?: string) {
        this.log(ERROR, context, message)
    }

    protected nextId(): string {
        return "#" + this.#counter.next().value;
    }

    private log(type: string, context: string, message?: string) {
        if (is(this.#logger)) {
            this.#logger(type, `[${this.#type}]-[${context}]`, new Date().toLocaleString(), message)
        }
    }

    protected abstract createKey(event: string, args: any[]): string;

}

export class BasicEventEmitHandler extends EmitHandlerBase implements IBpdEventEmitHandler {

    constructor(performer: IBpdHandlerPerformer) {
        super("BasicEventEmitHandler", performer);
    }

    createKey(eventName: string, args: any[]): string {
        return this.nextId();
    }
}

// Extended handler

export class ExtendedEventEmitHandler extends EmitHandlerBase implements IBpdEventEmitHandler {
    constructor(performer: IBpdHandlerPerformer, logger?: BpdEventLogger) {
        super("ExtendedEventEmitHandler", performer), logger;
    }

    createKey(eventName: string, args: any[]): string {
        let count = is(args) ? args.length : 0;
        let id = null;
        if (count > 0) {
            if (args.length === 1) {
                let val = args[0];
                if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                    id = "s:" + val;
                } else if (val.id) {
                    id = "ID:" + val.id;
                } else if (val.key) {
                    id = "KEY:" + val.key;
                }
            } else {

            }
            return [eventName, count, id === null ? JSON.stringify(args) : id].join("-");
        }

        return [eventName, count].join("-");
    }
}

