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
var _events, _eventHandler, _logger, _counter, _name, _events_1, _buses, _last, _logger_1, _ctx;
import { are, is, counter, getContextArgumentId } from "../core/functions";
import { BpdCallbackExecutor } from "../core/executors";
import { BpdEventEmitHandlerFactory } from "../bus/handlers";
import { getPerformer } from "../bus/performers";
import { ArgumentError } from "../core/errors";
import { BpdEventBusLogging } from "../core/logger";
import { getDefaultBusSetup } from "./statics";
export class BpdEventBusFactory {
    static create(setup) {
        if (!setup || !setup.queue || setup.queue.length === 0) {
            return initBusInstance(getDefaultBusSetup());
        }
        let bus = new BpdEventBusFarm(setup.queue, setup.logger);
        return bus;
    }
}
export class BpdEventBus {
    constructor(emitHandler, name, logCallback) {
        _events.set(this, void 0);
        _eventHandler.set(this, void 0);
        _logger.set(this, void 0);
        _counter.set(this, void 0);
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _events, {});
        __classPrivateFieldSet(this, _eventHandler, emitHandler);
        __classPrivateFieldSet(this, _counter, counter());
        __classPrivateFieldSet(this, _name, name !== null && name !== void 0 ? name : "EVENT_BUS");
        __classPrivateFieldSet(this, _logger, new BpdEventBusLogging(logCallback));
    }
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {ContextArgument} ctx - callback context with id
     * @param {ContextArgument} target - optional - cui element which event shall be attached to
     */
    on(name, callback, context) {
        if (!are(name, callback)) {
            __classPrivateFieldGet(this, _logger).error('on', "Missing argument");
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = this.prepareEventId(getContextArgumentId(context === null || context === void 0 ? void 0 : context.ctx));
        __classPrivateFieldGet(this, _logger).info("on", `Attaching new event: [${name}] for: [${id}]`);
        if (!__classPrivateFieldGet(this, _events)[name]) {
            __classPrivateFieldGet(this, _events)[name] = {};
        }
        __classPrivateFieldGet(this, _events)[name][id] = { ctx: context === null || context === void 0 ? void 0 : context.ctx, callback: callback, target: context === null || context === void 0 ? void 0 : context.target };
        return id;
    }
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    detach(name, ctx) {
        if (!is(name)) {
            __classPrivateFieldGet(this, _logger).error("detach", "Missing argument");
        }
        let ev = __classPrivateFieldGet(this, _events)[name];
        let id = getContextArgumentId(ctx);
        __classPrivateFieldGet(this, _logger).info("detach", `Detaching item: [${id}] from [${name}]`);
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
    detachAll(name) {
        if (is(name) && __classPrivateFieldGet(this, _events)[name]) {
            delete __classPrivateFieldGet(this, _events)[name];
        }
        else {
            __classPrivateFieldGet(this, _logger).error("detachAll", "Event name is missing or incorrect");
        }
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, target, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(event)) {
                throw new ArgumentError("Event name is incorrect");
            }
            let id = getContextArgumentId(target);
            __classPrivateFieldGet(this, _logger).info("emit", `Emit: [${event}], id: [${id}]`);
            yield __classPrivateFieldGet(this, _eventHandler).handle(event, __classPrivateFieldGet(this, _events)[event], id, args);
            return true;
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    isSubscribing(name, ctx) {
        let ev = __classPrivateFieldGet(this, _events)[name];
        return this.isAttached(ev, getContextArgumentId(ctx));
    }
    isAttached(ev, id) {
        //@ts-ignore id already checked
        return is(ev) && is(id) && is(ev[id]);
    }
    prepareEventId(ctx) {
        //@ts-ignore id already checked
        return is(ctx) ? ctx : this.getRandomEventId();
    }
    getRandomEventId() {
        return __classPrivateFieldGet(this, _name) + "_" + __classPrivateFieldGet(this, _counter).next().value;
    }
}
_events = new WeakMap(), _eventHandler = new WeakMap(), _logger = new WeakMap(), _counter = new WeakMap(), _name = new WeakMap();
export class BpdEventBusFarm {
    constructor(setup, logCallback) {
        _events_1.set(this, void 0);
        _buses.set(this, void 0);
        _last.set(this, void 0);
        _logger_1.set(this, void 0);
        _ctx.set(this, void 0);
        __classPrivateFieldSet(this, _ctx, "EXT");
        __classPrivateFieldSet(this, _logger_1, new BpdEventBusLogging(logCallback));
        __classPrivateFieldSet(this, _buses, []);
        __classPrivateFieldSet(this, _events_1, {});
        __classPrivateFieldSet(this, _last, 0);
        if (is(setup)) {
            __classPrivateFieldGet(this, _logger_1).info(__classPrivateFieldGet(this, _ctx), "Initiating buses");
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority;
            });
            sorted.forEach((item, index) => {
                __classPrivateFieldGet(this, _buses).push(initBusInstance(item, logCallback));
                __classPrivateFieldSet(this, _events_1, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _events_1)), this.mapEvents(item.eventsDef, index)));
                __classPrivateFieldGet(this, _logger_1).info(__classPrivateFieldGet(this, _ctx), `Bus ${item.name} has been initialized with number: ${index}`);
            });
            __classPrivateFieldGet(this, _buses).push(initBusInstance(getDefaultBusSetup(), logCallback));
            __classPrivateFieldSet(this, _last, __classPrivateFieldGet(this, _buses).length - 1);
            __classPrivateFieldGet(this, _logger_1).info(__classPrivateFieldGet(this, _ctx), `Bus initialization finished`);
        }
    }
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {BpdEventDetails} ctx - callback context with id
     */
    on(name, callback, ctx) {
        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument");
        }
        return this.get(name).on(name, callback, ctx);
    }
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    detach(name, ctx) {
        if (!are(name, ctx)) {
            throw new ArgumentError("Missing argument");
        }
        this.get(name).detach(name, ctx);
    }
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name) {
        this.get(name).detachAll(name);
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, context, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(event)) {
                throw new ArgumentError("Event name is incorrect");
            }
            return this.get(event).emit(event, context, ...args);
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {ContextArgument} ctx - callback context with id
    */
    isSubscribing(name, ctx) {
        return this.get(name).isSubscribing(name, ctx);
    }
    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    mapEvents(events, index) {
        return events.reduce((result, current) => {
            if (!result[current]) {
                return Object.assign(Object.assign({}, result), { [current]: index });
            }
            return result;
        }, {});
    }
    /**
     * Retrives porper event bus based on event name
     * @param event
     */
    get(event) {
        let idx = __classPrivateFieldGet(this, _events_1)[event];
        return __classPrivateFieldGet(this, _buses)[idx !== null && idx !== void 0 ? idx : __classPrivateFieldGet(this, _last)];
    }
}
_events_1 = new WeakMap(), _buses = new WeakMap(), _last = new WeakMap(), _logger_1 = new WeakMap(), _ctx = new WeakMap();
/**
 * Function that initiates single bus insatnce
 * @param setup
 * @param logger
 */
function initBusInstance(setup, logCallback) {
    var _a;
    if (!are(setup.name, setup.handling)) {
        throw new ArgumentError("Bus name or handler name is incorrect");
    }
    let executor = new BpdCallbackExecutor();
    let performer = getPerformer(executor, setup.policy);
    let handler = BpdEventEmitHandlerFactory.get((_a = setup.handling) !== null && _a !== void 0 ? _a : "", performer, logCallback);
    const bus = new BpdEventBus(handler, setup.name, logCallback);
    return bus;
}
