import z from "zod";
import { zEnvNonemptyTrimmed } from "@authwithback/shared/src/zod";


const zEnv = z.object({
    VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed
})

export const env = zEnv.parse(import.meta.env)