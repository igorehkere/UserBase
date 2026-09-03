import { logger } from "./lib/logger";
import { trpc } from "./lib/trpc";

export const trpcLoggerProcedure = trpc.procedure.use(
    trpc.middleware(async ({path, type, next, ctx, rawInput}) => {
        const start = Date.now()
        const result = await next()
        const durationMs = Date.now() - start
        const meta = {
            path,
            type,
            userId: ctx.me?.id || null,
            durationMs,
            rawInput: rawInput || null
        }
        if (result.ok) {
            logger.info(`trpc:${type}:success`, 'Successfull request', {...meta, output: result.data})
        } else {
            logger.error(`trpc:${type}:error`, result.error, meta)
        }

        return result
    })
)
