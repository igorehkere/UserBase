import * as Sentry from '@sentry/react'
import { env } from './env'


if (env.VITE_FRONTEND_SENTRY_DSN) {
    Sentry.init({
        dsn: env.VITE_FRONTEND_SENTRY_DSN,
        environment: env.HOST_ENV,
        normalizeDepth: 10
    })
}

export const sentryCaptureException = (error: Error) => {
    if (env.VITE_FRONTEND_SENTRY_DSN) {
        Sentry.captureException(error)
    }
}