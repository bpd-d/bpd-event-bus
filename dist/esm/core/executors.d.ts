import { IBpdCallbackExecutor } from "./interfaces";
export declare class BpdCallbackExecutor implements IBpdCallbackExecutor {
    execute(callback: any, ctx: any, args: any[]): Promise<void>;
}
