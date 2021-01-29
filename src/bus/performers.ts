import { BpdCallbackExecutor } from "../core/executors";
import { is, getContextArgumentId } from "../core/functions";
import { IBpdHandlerPerformer, IBpdCallbackExecutor, EmitHandlerData } from "../core/interfaces";

export class BpdHandlePerformerBase {
    protected idMatches(emitId: string | null, handleId: string | null) {
        return !is(emitId) || (is(emitId) && emitId == handleId);
    }
}

export class BpdBasicHandlePerformer extends BpdHandlePerformerBase implements IBpdHandlerPerformer {
    #executor: IBpdCallbackExecutor;
    constructor(executor: IBpdCallbackExecutor) {
        super();
        this.#executor = executor;
    }

    async perform(data: EmitHandlerData): Promise<boolean> {
        let event = null;
        let handleId = null;
        for (let id in data.events) {
            event = data.events[id]
            handleId = event.target ? getContextArgumentId(event.target) : null;
            if (this.idMatches(data.id, handleId))
                await this.#executor.execute(event.callback, event.ctx, data.args)

        }
        return true;
    }
}


export class BpdAsyncHandlePerformer extends BpdHandlePerformerBase implements IBpdHandlerPerformer {
    #executor: IBpdCallbackExecutor;
    constructor(executor: IBpdCallbackExecutor) {
        super();
        this.#executor = executor;
    }

    async perform(data: EmitHandlerData): Promise<boolean> {
        let promises: Promise<void>[] = []
        let event = null;
        let handleId = null;
        for (let id in data.events) {
            event = data.events[id]
            handleId = getContextArgumentId(event.target);
            if (this.idMatches(data.id, handleId))
                promises.push(this.#executor.execute(event.callback, event.ctx, data.args))
        }
        await Promise.all(promises)
        return true;
    }
}

export function getPerformer(executor: BpdCallbackExecutor, policy?: string) {
    return policy === "tasked" ? new BpdAsyncHandlePerformer(executor) : new BpdBasicHandlePerformer(executor);
}