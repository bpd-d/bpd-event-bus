import { is } from "./functions"
import { IBpdCallbackExecutor } from "./interfaces"

export class BpdCallbackExecutor implements IBpdCallbackExecutor {
    async execute(callback: any, ctx: any, args: any[]): Promise<void> {
        args = args ?? []
        if (is(ctx) && typeof ctx !== 'string') {
            callback.apply(ctx, args)
        } else {
            callback(...args)
        }
        return
    }
}