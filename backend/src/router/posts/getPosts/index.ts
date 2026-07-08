import { trpc } from '../../../lib/trpc';
import _ from 'lodash'
import { zGetPostsTrpcInput } from './input';

export const getPostsTrpcRoute = trpc.procedure.input(zGetPostsTrpcInput).query(async ({ input, ctx }) => {
  const rawPosts = await ctx.prisma.post.findMany({
    select: {
      _count: {
        select: {
          postLikes: true
        }
      },
      postLikes: {
        select: {
          id: true
        },
        where: {
          userId: ctx.me?.id
        }
      },
      id: true,
      text: true,
      createdAt: true,
      authorId: true,
      author: true,
      serialNumber: true
    },
    cursor: input.cursor ? {serialNumber: input.cursor} : undefined,
    take: input.limit + 1,
    orderBy: [{
      createdAt: 'desc'
    }, {
      serialNumber: 'desc'
    }] ,
  });

  const nextPost = rawPosts.at(input.limit);
  const nextCursor = nextPost?.serialNumber
  const postsExeptNext = rawPosts.splice(0, input.limit)
  const postExcept = postsExeptNext.map((post) => ({
      ..._.omit(post, ['_count']),
      likesCount: post._count.postLikes,
      postLikes: post.postLikes,
      isLikedByMe: !!post.postLikes.length,
  }))
  return { posts: postExcept, nextCursor };
});
