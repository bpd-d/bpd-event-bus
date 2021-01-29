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
var _executor, _executor_1;
import { is, getContextArgumentId } from "../core/functions";
export class BpdHandlePerformerBase {
    idMatches(emitId, handleId) {
        return !is(emitId) || (is(emitId) && emitId == handleId);
    }
}
export class BpdBasicHandlePerformer extends BpdHandlePerformerBase {
    constructor(executor) {
        super();
        _executor.set(this, void 0);
        __classPrivateFieldSet(this, _executor, executor);
    }
    perform(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let event = null;
            let handleId = null;
            for (let id in data.events) {
                event = data.events[id];
                handleId = event.target ? getContextArgumentId(event.target) : null;
                if (this.idMatches(data.id, handleId))
                    yield __classPrivateFieldGet(this, _executor).execute(event.callback, event.ctx, data.args);
            }
            return true;
        });
    }
}
_executor = new WeakMap();
export class BpdAsyncHandlePerformer extends BpdHandlePerformerBase {
    constructor(executor) {
        super();
        _executor_1.set(this, void 0);
        __classPrivateFieldSet(this, _executor_1, executor);
    }
    perform(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            let event = null;
            let handleId = null;
            for (let id in data.events) {
                event = data.events[id];
                handleId = getContextArgumentId(event.target);
                if (this.idMatches(data.id, handleId))
                    promises.push(__classPrivateFieldGet(this, _executor_1).execute(event.callback, event.ctx, data.args));
            }
            yield Promise.all(promises);
            return true;
        });
    }
}
_executor_1 = new WeakMap();
export function getPerformer(executor, policy) {
    return policy === "tasked" ? new BpdAsyncHandlePerformer(executor) : new BpdBasicHandlePerformer(executor);
}
