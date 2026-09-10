import z from "zod";
import { zEnvNonemptyTrimmed, zEnvNonemptyTrimmedOnNotLocal } from "@authwithback/shared/src/zod";


const zEnv = z.object({
    VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
    NODE_ENV: z.enum(['development', 'production']),
    VITE_FRONTEND_SENTRY_DSN: zEnvNonemptyTrimmedOnNotLocal,
    HOST_ENV: z.enum(['local', 'production'])
})

export const env = zEnv.parse(process.env)