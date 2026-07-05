import { trpc } from '../../lib/trpc';
import _ from 'lodash'

export const getPostsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
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
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    },
  });
  const postExcept = rawPosts.map((post) => ({
      ..._.omit(post, ['_count']),
      likesCount: post._count.postLikes,
      postLikes: post.postLikes,
      isLikedByMe: !!post.postLikes.length,
  }))
  return { posts: postExcept };
});
