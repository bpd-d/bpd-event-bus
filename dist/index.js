(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpd-event-bus", [], factory);
	else if(typeof exports === 'object')
		exports["bpd-event-bus"] = factory();
	else
		root["bpd-event-bus"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "BPD_EVENT_BUS_VERSION", function() { return /* binding */ BPD_EVENT_BUS_VERSION; });

// CONCATENATED MODULE: ./src/core/functions.ts
/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
function is(val, typecheck = true) {
    if (typeof val !== 'undefined' && val !== null) {
        if (!typecheck) {
            return true;
        }
        else {
            return !isEmpty(val);
        }
    }
    return false;
}
/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
function isEmpty(val) {
    if (typeof val === "string") {
        return val.length === 0;
    }
    if (typeof val === "boolean") {
        return val;
    }
    else if (Array.isArray(val)) {
        return val.length === 0;
    }
    return false;
}
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
function are(...attributes) {
    if (!is(attributes)) {
        return false;
    }
    let c = attributes.length;
    for (let i = 0; i < c; i++) {
        if (!is(attributes[i])) {
            return false;
        }
    }
    return true;
}
function* counter() {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0;
        }
    }
}
function getContextArgumentId(ctx) {
    if (!ctx) {
        return null;
    }
    else if (typeof ctx === 'string') {
        return ctx;
    }
    else {
        return ctx.eventId;
    }
}

// CONCATENATED MODULE: ./src/core/executors.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class executors_BpdCallbackExecutor {
    execute(callback, ctx, args) {
        return __awaiter(this, void 0, void 0, function* () {
            args = args !== null && args !== void 0 ? args : [];
            if (is(ctx) && typeof ctx !== 'string') {
                callback.apply(ctx, args);
            }
            else {
                callback(...args);
            }
            return;
        });
    }
}

// CONCATENATED MODULE: ./src/core/collection.ts
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _keys, _values;

class collection_BpdEventsCollection {
    constructor() {
        _keys.set(this, void 0);
        _values.set(this, void 0);
        __classPrivateFieldSet(this, _keys, []);
        __classPrivateFieldSet(this, _values, []);
    }
    add(key, value) {
        if (is(key) && !this.has(key)) {
            __classPrivateFieldGet(this, _keys).push(key);
            __classPrivateFieldGet(this, _values).push(value);
        }
    }
    remove(key) {
        if (is(key) && this.has(key)) {
            let index = this.indexOf(key);
            if (index > -1) {
                __classPrivateFieldGet(this, _keys).splice(index, 1);
                __classPrivateFieldGet(this, _values).splice(index, 1);
            }
        }
    }
    has(key) {
        return __classPrivateFieldGet(this, _keys).includes(key);
    }
    get(index) {
        if (index > -1 && index < this.length()) {
            return {
                key: __classPrivateFieldGet(this, _keys)[index],
                value: __classPrivateFieldGet(this, _values)[index]
            };
        }
        return null;
    }
    first() {
        return this.get(0);
    }
    length() {
        return __classPrivateFieldGet(this, _keys).length;
    }
    indexOf(key) {
        return __classPrivateFieldGet(this, _keys).indexOf(key);
    }
}
_keys = new WeakMap(), _values = new WeakMap();

// CONCATENATED MODULE: ./src/core/statics.ts
const ERROR = "ERROR";
const INFO = "INFO";

// CONCATENATED MODULE: ./src/core/logger.ts
var logger_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var logger_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _logger;

class logger_BpdEventBusLogging {
    constructor(logger) {
        _logger.set(this, void 0);
        logger_classPrivateFieldSet(this, _logger, logger);
    }
    set(logger) {
        logger_classPrivateFieldSet(this, _logger, logger);
    }
    get() {
        return logger_classPrivateFieldGet(this, _logger);
    }
    error(ctx, message) {
        this.log(ERROR, ctx, message);
    }
    info(ctx, message) {
        this.log(INFO, ctx, message);
    }
    log(type, ctx, message) {
        if (logger_classPrivateFieldGet(this, _logger)) {
            logger_classPrivateFieldGet(this, _logger).call(this, type, ctx, new Date().toLocaleString(), message);
        }
    }
}
_logger = new WeakMap();

// CONCATENATED MODULE: ./src/bus/handlers.ts
var handlers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var handlers_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var handlers_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var handlers_logger, _counter, _performer;



class handlers_EmitHandlerBase {
    constructor(type, performer, logCallback) {
        handlers_logger.set(this, void 0);
        _counter.set(this, void 0);
        _performer.set(this, void 0);
        this.queue = new collection_BpdEventsCollection();
        handlers_classPrivateFieldSet(this, _performer, performer);
        this.isBusy = false;
        handlers_classPrivateFieldSet(this, handlers_logger, new logger_BpdEventBusLogging(logCallback));
        handlers_classPrivateFieldSet(this, _counter, counter());
    }
    handle(event, events, id, args) {
        return handlers_awaiter(this, void 0, void 0, function* () {
            if (!is(events)) {
                handlers_classPrivateFieldGet(this, handlers_logger).error("handle", "No events provided");
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
                            yield handlers_classPrivateFieldGet(this, _performer).perform(queueItem.value);
                    }
                    catch (e) {
                        handlers_classPrivateFieldGet(this, handlers_logger).error("perform", e.message);
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
        return "#" + handlers_classPrivateFieldGet(this, _counter).next().value;
    }
}
handlers_logger = new WeakMap(), _counter = new WeakMap(), _performer = new WeakMap();
class BasicEventEmitHandler extends handlers_EmitHandlerBase {
    constructor(performer, logCallback) {
        super("BasicEventEmitHandler", performer, logCallback);
    }
    createKey(eventName, args) {
        return this.nextId();
    }
}
// Extended handler
class handlers_ExtendedEventEmitHandler extends handlers_EmitHandlerBase {
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
class BpdEventEmitHandlerFactory {
    static get(name, performer, logCallback) {
        switch (name) {
            case "extended":
                return new handlers_ExtendedEventEmitHandler(performer, logCallback);
            default:
                return new BasicEventEmitHandler(performer, logCallback);
        }
    }
}

// CONCATENATED MODULE: ./src/bus/performers.ts
var performers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var performers_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var performers_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _executor, _executor_1;

class performers_BpdHandlePerformerBase {
    idMatches(emitId, handleId) {
        return !is(emitId) || (is(emitId) && emitId == handleId);
    }
}
class performers_BpdBasicHandlePerformer extends performers_BpdHandlePerformerBase {
    constructor(executor) {
        super();
        _executor.set(this, void 0);
        performers_classPrivateFieldSet(this, _executor, executor);
    }
    perform(data) {
        return performers_awaiter(this, void 0, void 0, function* () {
            let event = null;
            let handleId = null;
            for (let id in data.events) {
                event = data.events[id];
                handleId = event.target ? getContextArgumentId(event.target) : null;
                if (this.idMatches(data.id, handleId))
                    yield performers_classPrivateFieldGet(this, _executor).execute(event.callback, event.ctx, data.args);
            }
            return true;
        });
    }
}
_executor = new WeakMap();
class performers_BpdAsyncHandlePerformer extends performers_BpdHandlePerformerBase {
    constructor(executor) {
        super();
        _executor_1.set(this, void 0);
        performers_classPrivateFieldSet(this, _executor_1, executor);
    }
    perform(data) {
        return performers_awaiter(this, void 0, void 0, function* () {
            let promises = [];
            let event = null;
            let handleId = null;
            for (let id in data.events) {
                event = data.events[id];
                handleId = getContextArgumentId(event.target);
                if (this.idMatches(data.id, handleId))
                    promises.push(performers_classPrivateFieldGet(this, _executor_1).execute(event.callback, event.ctx, data.args));
            }
            yield Promise.all(promises);
            return true;
        });
    }
}
_executor_1 = new WeakMap();
function getPerformer(executor, policy) {
    return policy === "tasked" ? new performers_BpdAsyncHandlePerformer(executor) : new performers_BpdBasicHandlePerformer(executor);
}

// CONCATENATED MODULE: ./src/core/errors.ts
class ErrorBase extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
class ArgumentError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}

// CONCATENATED MODULE: ./src/bus/statics.ts
function getDefaultBusSetup() {
    return {
        name: "Default",
        handling: "basic",
        policy: "tasked",
        eventsDef: [],
        priority: 99
    };
}

// CONCATENATED MODULE: ./src/bus/engine.ts
var engine_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var engine_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var engine_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _events, _eventHandler, engine_logger, engine_counter, _name, _events_1, _buses, _last, _logger_1, _ctx;







class engine_BpdEventBusFactory {
    static create(setup) {
        if (!setup || !setup.queue || setup.queue.length === 0) {
            return initBusInstance(getDefaultBusSetup());
        }
        let bus = new engine_BpdEventBusFarm(setup.queue, setup.logger);
        return bus;
    }
}
class engine_BpdEventBus {
    constructor(emitHandler, name, logCallback) {
        _events.set(this, void 0);
        _eventHandler.set(this, void 0);
        engine_logger.set(this, void 0);
        engine_counter.set(this, void 0);
        _name.set(this, void 0);
        engine_classPrivateFieldSet(this, _events, {});
        engine_classPrivateFieldSet(this, _eventHandler, emitHandler);
        engine_classPrivateFieldSet(this, engine_counter, counter());
        engine_classPrivateFieldSet(this, _name, name !== null && name !== void 0 ? name : "EVENT_BUS");
        engine_classPrivateFieldSet(this, engine_logger, new logger_BpdEventBusLogging(logCallback));
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
            engine_classPrivateFieldGet(this, engine_logger).error('on', "Missing argument");
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = this.prepareEventId(getContextArgumentId(context === null || context === void 0 ? void 0 : context.ctx));
        engine_classPrivateFieldGet(this, engine_logger).info("on", `Attaching new event: [${name}] for: [${id}]`);
        if (!engine_classPrivateFieldGet(this, _events)[name]) {
            engine_classPrivateFieldGet(this, _events)[name] = {};
        }
        engine_classPrivateFieldGet(this, _events)[name][id] = { ctx: context === null || context === void 0 ? void 0 : context.ctx, callback: callback, target: context === null || context === void 0 ? void 0 : context.target };
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
            engine_classPrivateFieldGet(this, engine_logger).error("detach", "Missing argument");
        }
        let ev = engine_classPrivateFieldGet(this, _events)[name];
        let id = getContextArgumentId(ctx);
        engine_classPrivateFieldGet(this, engine_logger).info("detach", `Detaching item: [${id}] from [${name}]`);
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
        if (is(name) && engine_classPrivateFieldGet(this, _events)[name]) {
            delete engine_classPrivateFieldGet(this, _events)[name];
        }
        else {
            engine_classPrivateFieldGet(this, engine_logger).error("detachAll", "Event name is missing or incorrect");
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
        return engine_awaiter(this, void 0, void 0, function* () {
            if (!is(event)) {
                throw new ArgumentError("Event name is incorrect");
            }
            let id = getContextArgumentId(target);
            engine_classPrivateFieldGet(this, engine_logger).info("emit", `Emit: [${event}], id: [${id}]`);
            yield engine_classPrivateFieldGet(this, _eventHandler).handle(event, engine_classPrivateFieldGet(this, _events)[event], id, args);
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
        let ev = engine_classPrivateFieldGet(this, _events)[name];
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
        return engine_classPrivateFieldGet(this, _name) + "_" + engine_classPrivateFieldGet(this, engine_counter).next().value;
    }
}
_events = new WeakMap(), _eventHandler = new WeakMap(), engine_logger = new WeakMap(), engine_counter = new WeakMap(), _name = new WeakMap();
class engine_BpdEventBusFarm {
    constructor(setup, logCallback) {
        _events_1.set(this, void 0);
        _buses.set(this, void 0);
        _last.set(this, void 0);
        _logger_1.set(this, void 0);
        _ctx.set(this, void 0);
        engine_classPrivateFieldSet(this, _ctx, "EXT");
        engine_classPrivateFieldSet(this, _logger_1, new logger_BpdEventBusLogging(logCallback));
        engine_classPrivateFieldSet(this, _buses, []);
        engine_classPrivateFieldSet(this, _events_1, {});
        engine_classPrivateFieldSet(this, _last, 0);
        if (is(setup)) {
            engine_classPrivateFieldGet(this, _logger_1).info(engine_classPrivateFieldGet(this, _ctx), "Initiating buses");
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority;
            });
            sorted.forEach((item, index) => {
                engine_classPrivateFieldGet(this, _buses).push(initBusInstance(item, logCallback));
                engine_classPrivateFieldSet(this, _events_1, Object.assign(Object.assign({}, engine_classPrivateFieldGet(this, _events_1)), this.mapEvents(item.eventsDef, index)));
                engine_classPrivateFieldGet(this, _logger_1).info(engine_classPrivateFieldGet(this, _ctx), `Bus ${item.name} has been initialized with number: ${index}`);
            });
            engine_classPrivateFieldGet(this, _buses).push(initBusInstance(getDefaultBusSetup(), logCallback));
            engine_classPrivateFieldSet(this, _last, engine_classPrivateFieldGet(this, _buses).length - 1);
            engine_classPrivateFieldGet(this, _logger_1).info(engine_classPrivateFieldGet(this, _ctx), `Bus initialization finished`);
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
        return engine_awaiter(this, void 0, void 0, function* () {
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
        let idx = engine_classPrivateFieldGet(this, _events_1)[event];
        return engine_classPrivateFieldGet(this, _buses)[idx !== null && idx !== void 0 ? idx : engine_classPrivateFieldGet(this, _last)];
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
    let executor = new executors_BpdCallbackExecutor();
    let performer = getPerformer(executor, setup.policy);
    let handler = BpdEventEmitHandlerFactory.get((_a = setup.handling) !== null && _a !== void 0 ? _a : "", performer, logCallback);
    const bus = new engine_BpdEventBus(handler, setup.name, logCallback);
    return bus;
}

// CONCATENATED MODULE: ./src/index.ts

const BPD_EVENT_BUS_VERSION = "0.1.3";
window.$bpdEventBusVersion = BPD_EVENT_BUS_VERSION;
window.$bpdEvenBusFactory = engine_BpdEventBusFactory;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map