import z from "zod";
import { zEnvNonemptyTrimmed } from "@authwithback/shared/src/zod";


const zEnv = z.object({
    VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
    NODE_ENV: z.enum(['development', 'production'])
})

export const env = zEnv.parse(process.env)