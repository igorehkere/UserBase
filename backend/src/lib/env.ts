import * as dotenv from 'dotenv'
import z from 'zod'
import {zEnvNonemptyTrimmed, zEnvNonemptyTrimmedOnNotLocal} from '@authwithback/shared/src/zod'

dotenv.config()

const zEnv = z.object({
    DATABASE_URL: zEnvNonemptyTrimmed,
    JWT_SECRET: zEnvNonemptyTrimmed,
    PORT: zEnvNonemptyTrimmed,
    PASSWORD_SALT: zEnvNonemptyTrimmed,
    INITIAL_ADMIN_PASSWORD: zEnvNonemptyTrimmed,
    HOST_ENV: z.enum(['local', 'production']),
    CLOUDINARY_API_KEY: zEnvNonemptyTrimmedOnNotLocal,
    CLOUDINARY_API_SECRET: zEnvNonemptyTrimmedOnNotLocal,
    CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed
})

export const env = zEnv.parse(process.env)