import { BpdEventReceiver, IBpdEventEmitHandler, IBpdCallbackExecutor, BpdEventLoggerCallback, IBpdCollection, IBpdHandlerPerformer, EmitHandlerData } from "../core/interfaces";
import { is, counter } from "../core/functions";
import { INFO, ERROR } from "../core/statics";
import { BpdEventsCollection } from "../core/collection";
import { BpdEventBusLogging, IBpdEventBusLogging } from "../core/logger";



abstract class EmitHandlerBase {
    isBusy: boolean;
    queue: IBpdCollection<EmitHandlerData>;
    #logger: IBpdEventBusLogging;
    #counter: Generator<number, void, unknown>;
    #performer: IBpdHandlerPerformer;
    constructor(type: string, performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback) {
        this.queue = new BpdEventsCollection();
        this.#performer = performer;
        this.isBusy = false;
        this.#logger = new BpdEventBusLogging(logCallback);
        this.#counter = counter();
    }

    async handle(event: string, events: BpdEventReceiver, id: string | null, args: any[]): Promise<boolean> {
        if (!is(events)) {
            this.#logger.error("handle", "No events provided")
            return false;
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
                if (!queueItem) {
                    break;
                }
                try {
                    if (queueItem.value)
                        await this.#performer.perform(queueItem.value);
                } catch (e) {
                    this.#logger.error("perform", e.message)
                } finally {
                    this.queue.remove(queueItem.key);
                }

            }
            this.isBusy = false;
        }
        return true;
    }


    protected nextId(): string {
        return "#" + this.#counter.next().value;
    }

    protected abstract createKey(event: string, args: any[]): string;

}

export class BasicEventEmitHandler extends EmitHandlerBase implements IBpdEventEmitHandler {

    constructor(performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback) {
        super("BasicEventEmitHandler", performer, logCallback);
    }

    createKey(eventName: string, args: any[]): string {
        return this.nextId();
    }
}

// Extended handler

export class ExtendedEventEmitHandler extends EmitHandlerBase implements IBpdEventEmitHandler {
    constructor(performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback) {
        super("ExtendedEventEmitHandler", performer, logCallback);
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

export class BpdEventEmitHandlerFactory {
    static get(name: string, performer: IBpdHandlerPerformer, logCallback?: BpdEventLoggerCallback): IBpdEventEmitHandler {
        switch (name) {
            case "extended":
                return new ExtendedEventEmitHandler(performer, logCallback);
            default:
                return new BasicEventEmitHandler(performer, logCallback);
        }
    }
}