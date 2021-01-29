import { BpdCallbackExecutor } from "../core/executors";
import { IBpdHandlerPerformer, IBpdCallbackExecutor, EmitHandlerData } from "../core/interfaces";
export declare class BpdHandlePerformerBase {
    protected idMatches(emitId: string | null, handleId: string | null): boolean;
}
export declare class BpdBasicHandlePerformer extends BpdHandlePerformerBase implements IBpdHandlerPerformer {
    #private;
    constructor(executor: IBpdCallbackExecutor);
    perform(data: EmitHandlerData): Promise<boolean>;
}
export declare class BpdAsyncHandlePerformer extends BpdHandlePerformerBase implements IBpdHandlerPerformer {
    #private;
    constructor(executor: IBpdCallbackExecutor);
    perform(data: EmitHandlerData): Promise<boolean>;
}
export declare function getPerformer(executor: BpdCallbackExecutor, policy?: string): BpdBasicHandlePerformer | BpdAsyncHandlePerformer;
