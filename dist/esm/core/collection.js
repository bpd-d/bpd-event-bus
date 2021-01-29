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
var _keys, _values;
import { is } from "./functions";
export class BpdEventsCollection {
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
