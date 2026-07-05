import { trpc } from '../../../lib/trpc';
import { zSetPostLikeTrpcInput } from "./input";


export const setPostLikeTrpcRoute = trpc.procedure.input(zSetPostLikeTrpcInput).mutation(async ({input, ctx}) => {
    const {postId, isLikedByMe} = input
    if (!ctx.me) {
        throw new Error('UNAUTHORIZED')
    }
    const post = await ctx.prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if (!post) {
        throw new Error('Post not found')
    }
    if (isLikedByMe) {
        await ctx.prisma.postLike.upsert({
            where: {
                postId_userId: {
                    postId,
                    userId: ctx.me.id
                },
            },
            create: {
                userId: ctx.me.id,
                postId
            },
            update: {},
        })
    } else {
        await ctx.prisma.postLike.delete({
            where: {
                postId_userId: {
                    postId,
                    userId: ctx.me.id
                }
            },
        })
    }

    const likesCount = await ctx.prisma.postLike.count({
        where: {
            postId
        }
    })

    return {
        post: {
            id: post.id,
            likesCount,
            isLikedByMe
        }
    }
})