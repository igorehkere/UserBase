import { trpcLoggerProcedure } from '../../../lib/trpc';
import { zCreatePostTrpcInput } from './input';

export const createPostTrpcRoute = trpcLoggerProcedure.input(zCreatePostTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('Для создания поста нужно авторизоваться');
  }

  const post = await ctx.prisma.post.create({
    data: {
      ...input,
      authorId: ctx.me.id,
    },
  });
  return post;
});
