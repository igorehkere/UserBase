import _ from 'lodash';
import { trpcLoggerProcedure } from '../../../lib/trpc';

export const getMeTrpcRoute = trpcLoggerProcedure.query(async ({ ctx }) => {
  const rawPosts = await ctx.prisma.post.findMany({
    where: {
      authorId: ctx.me?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      _count: {
        select: {
          postLikes: true,
        },
      },
      postLikes: {
        select: {
          id: true,
        },
        where: {
          userId: ctx.me?.id,
        },
      },
      id: true,
      text: true,
      createdAt: true,
      authorId: true,
      serialNumber: true,
      blockedAt: true,
    },
  });

  const posts = rawPosts.map((post) => ({
      ..._.omit(post, ['_count']),
      likesCount: post._count.postLikes,
      postLikes: post.postLikes,
      isLikedByMe: !!post.postLikes.length,
    }));

  return {
    me: ctx.me
      ? {
          ..._.pick(ctx.me, ['id', 'nick', 'firstname', 'lastname', 'permissions', 'avatar']),
          posts,
        }
      : null,
  };
});
