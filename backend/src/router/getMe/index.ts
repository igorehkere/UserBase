import { trpc } from "../../lib/trpc";
import _ from "lodash";

export const getMeTrpcRoute = trpc.procedure.query(async ({ctx}) => {
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
            ..._.pick(ctx.me, ['id', 'nick', 'firstname', 'lastname']),
            posts
        } : null
    }
})