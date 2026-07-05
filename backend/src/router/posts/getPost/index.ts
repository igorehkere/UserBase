import _ from 'lodash';
import { trpc } from '../../../lib/trpc';
import { zGetPostTrpcInput } from './input';

export const getPostTrpcRoute = trpc.procedure.input(zGetPostTrpcInput).query(async ({ ctx, input }) => {
  const rawPost = await ctx.prisma.post.findUnique({
    where: {
      id: input.id,
    },
    include: {
      postLikes: {
        select: {
          id: true,
        },
        where: {
          userId: ctx.me?.id,
        },
      },
      _count: {
        select: {
          postLikes: true,
        },
      },
    },
  });

  if (!rawPost) {
    throw new Error('Post not found');
  }

  const isLikedByMe = !!rawPost.postLikes.length;
  const likesCount = rawPost._count.postLikes || 0;
  const post = rawPost && { ..._.omit(rawPost, ['postLikes', '_count']), isLikedByMe, likesCount };

  return { post };
});
