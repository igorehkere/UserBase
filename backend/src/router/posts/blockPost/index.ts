import { trpc } from "../../../lib/trpc";
import { canBlockPosts } from "../../../utils/canBlockPosts";
import { zBlockPostTrpcInput } from "./input";


export const blockPostTrpcRoute = trpc.procedure.input(zBlockPostTrpcInput).mutation(async ({ctx, input}) => {
    const {postId} = input
    if (!canBlockPosts(ctx.me)) {
        throw new Error('Block posts only for admins')
    }
    const post = await ctx.prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if (!post) {
        throw new Error('Post not found')
    }
    await ctx.prisma.post.update({
        where: {
            id: postId
        },
        data: {
            blockedAt: new Date()
        }
    })
    
    return true
})