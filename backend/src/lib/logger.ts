import winston from "winston";
import { env } from "./env";
import { serializeError } from "serialize-error";
import { deepMap } from "./deepMap";

type Meta = Record<string, any> | undefined

const prettifyMeta = (meta: Meta): Meta => {
    return deepMap(meta, ({key, value}) => {
        if (['email', 'password', 'newPassword', 'oldPassword', 'token'].includes(key)) {
            return 'hide'
        }
        return value
    })
}

const winstonLogger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({stack: true}),
        winston.format.json()
    ),
    defaultMeta: {service: 'backend', hostEnv: env.HOST_ENV},
    transports: [
        new winston.transports.Console({
            format: winston.format.json()
        })
    ]
})

export const logger = {
    info: (logType: string, message: string, meta?: Record<string, any>) => {
        winstonLogger.info(message, {logType, ...prettifyMeta(meta)})
    },
    error: (logType: string, error: any, meta?: Record<string, any>) => {
        const serializedError = serializeError(error)
        winstonLogger.error(serializedError.message || 'Unknown error', {
            logType,
            error,
            errorStack: serializedError.stack,
            ...prettifyMeta(meta)
        })
    }
}