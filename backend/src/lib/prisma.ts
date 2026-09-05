import { PrismaClient } from "@prisma/client"
import { logger } from "./logger"
import { env } from "./env"

export const createPrismaClient = () => {
    const prisma = new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query'
            }, {
                emit: 'event',
                level: 'info'
            }
        ]
    })
    prisma.$on('query', (e) => {
        logger.info('prisma:low:query', 'Successfull request', {
            query: e.query,
            duration: e.duration,
            params: env.HOST_ENV === 'local' ? e.params : '****'
        })
    })
    
}