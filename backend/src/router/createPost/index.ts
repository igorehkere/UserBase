import { trpc } from '../../lib/trpc';
import { zCreatePostTrpcInput } from './input';

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('Для создания поста нужно авторизоваться');
  }

  const exPost = await ctx.prisma.post.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (exPost) {
    throw new Error('Пост с таким ником уже существует');
  }

  await ctx.prisma.post.create({
    data: {
      ...input,
      authorId: ctx.me.id,
    },
  });
  return true;
});
