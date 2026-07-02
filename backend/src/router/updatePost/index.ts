import { trpc } from "../../lib/trpc";
import { zUpdatePostTrpcInput } from "./input";


export const updatePostTrpcRoute = trpc.procedure.input(zUpdatePostTrpcInput).mutation(async ({ctx, input}) => {
    const {postId, ...postInput} = input

    if (!ctx.me) {
        throw new Error('Authorizate')
    }

    const post = await ctx.prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error('Not found post')
    }

    if (ctx.me.id !== post.authorId) {
        throw new Error('Update only author')
    }

    await ctx.prisma.post.update({
        where: {
            id: postId
        },
        data: {
            ...postInput
        }
    })

    return true
})