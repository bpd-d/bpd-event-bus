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
var _logger;
import { ERROR, INFO } from "./statics";
export class BpdEventBusLogging {
    constructor(logger) {
        _logger.set(this, void 0);
        __classPrivateFieldSet(this, _logger, logger);
    }
    set(logger) {
        __classPrivateFieldSet(this, _logger, logger);
    }
    get() {
        return __classPrivateFieldGet(this, _logger);
    }
    error(ctx, message) {
        this.log(ERROR, ctx, message);
    }
    info(ctx, message) {
        this.log(INFO, ctx, message);
    }
    log(type, ctx, message) {
        if (__classPrivateFieldGet(this, _logger)) {
            __classPrivateFieldGet(this, _logger).call(this, type, ctx, new Date().toLocaleString(), message);
        }
    }
}
_logger = new WeakMap();
