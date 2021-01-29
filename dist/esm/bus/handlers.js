var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _logger, _counter, _performer;
import { is, counter } from "../core/functions";
import { BpdEventsCollection } from "../core/collection";
import { BpdEventBusLogging } from "../core/logger";
class EmitHandlerBase {
    constructor(type, performer, logCallback) {
        _logger.set(this, void 0);
        _counter.set(this, void 0);
        _performer.set(this, void 0);
        this.queue = new BpdEventsCollection();
        __classPrivateFieldSet(this, _performer, performer);
        this.isBusy = false;
        __classPrivateFieldSet(this, _logger, new BpdEventBusLogging(logCallback));
        __classPrivateFieldSet(this, _counter, counter());
    }
    handle(event, events, id, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(events)) {
                __classPrivateFieldGet(this, _logger).error("handle", "No events provided");
                return false;
            }
            let key = this.createKey(event, args);
            this.queue.add(key, {
                events: events,
                id: id,
                args: args
            });
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
                            yield __classPrivateFieldGet(this, _performer).perform(queueItem.value);
                    }
                    catch (e) {
                        __classPrivateFieldGet(this, _logger).error("perform", e.message);
                    }
                    finally {
                        this.queue.remove(queueItem.key);
                    }
                }
                this.isBusy = false;
            }
            return true;
        });
    }
    nextId() {
        return "#" + __classPrivateFieldGet(this, _counter).next().value;
    }
}
_logger = new WeakMap(), _counter = new WeakMap(), _performer = new WeakMap();
export class BasicEventEmitHandler extends EmitHandlerBase {
    constructor(performer, logCallback) {
        super("BasicEventEmitHandler", performer, logCallback);
    }
    createKey(eventName, args) {
        return this.nextId();
    }
}
// Extended handler
export class ExtendedEventEmitHandler extends EmitHandlerBase {
    constructor(performer, logCallback) {
        super("ExtendedEventEmitHandler", performer, logCallback);
    }
    createKey(eventName, args) {
        let count = is(args) ? args.length : 0;
        let id = null;
        if (count > 0) {
            if (args.length === 1) {
                let val = args[0];
                if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                    id = "s:" + val;
                }
                else if (val.id) {
                    id = "ID:" + val.id;
                }
                else if (val.key) {
                    id = "KEY:" + val.key;
                }
            }
            else {
            }
            return [eventName, count, id === null ? JSON.stringify(args) : id].join("-");
        }
        return [eventName, count].join("-");
    }
}
export class BpdEventEmitHandlerFactory {
    static get(name, performer, logCallback) {
        switch (name) {
            case "extended":
                return new ExtendedEventEmitHandler(performer, logCallback);
            default:
                return new BasicEventEmitHandler(performer, logCallback);
        }
    }
}
