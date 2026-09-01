import * as dotenv from 'dotenv'
import z from 'zod'
import {zEnvNonemptyTrimmed} from '@authwithback/shared/src/zod'

dotenv.config()

const zEnv = z.object({
    DATABASE_URL: zEnvNonemptyTrimmed,
    JWT_SECRET: zEnvNonemptyTrimmed,
    PORT: zEnvNonemptyTrimmed,
    PASSWORD_SALT: zEnvNonemptyTrimmed,
    INITIAL_ADMIN_PASSWORD: zEnvNonemptyTrimmed
})

export const env = zEnv.parse(process.env)