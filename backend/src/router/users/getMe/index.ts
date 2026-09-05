import _ from "lodash";
import { trpcLoggerProcedure } from "../../../lib/trpc";

export const getMeTrpcRoute = trpcLoggerProcedure.query(async ({ctx}) => {
    const posts = await ctx.prisma.post.findMany({
        where: {
            authorId: ctx.me?.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return {
        me: ctx.me ? {
            ..._.pick(ctx.me, ['id', 'nick', 'firstname', 'lastname', 'permissions']),
            posts
        } : null
    }
})