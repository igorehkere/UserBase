import z from 'zod';
import { trpcLoggerProcedure } from '../../../lib/trpc';
import _ from 'lodash';

export const getUserTrpcRoute = trpcLoggerProcedure
  .input(
    z.object({
      userName: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.userName,
      },
      include: {
        posts: true,
      },
    });

    const rawPosts = await ctx.prisma.post.findMany({
    where: {
      authorId: user?.id,
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
      images: true,
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
        user: user
          ? {
              ..._.pick(user, ['id', 'nick', 'firstname', 'lastname', 'permissions', 'avatar']),
              posts,
            }
          : null,
      };
  });
