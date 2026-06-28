import { trpc } from '../../lib/trpc';
import { zCreatePostTrpcInput } from './input';

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('Для создания поста нужно авторизоваться');
  }

  await ctx.prisma.post.create({
    data: {
      ...input,
      authorId: ctx.me.id,
    },
  });
  return true;
});
