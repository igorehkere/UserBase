import { trpc } from '../../lib/trpc';
import { zGetPostTrpcInput } from './input';

export const getPostTrpcRoute = trpc.procedure.input(zGetPostTrpcInput).query(async ({ ctx, input }) => {
  const post = await ctx.prisma.post.findUnique({
    where: {
      id: input.id,
    },
  });

  if (!post) {
    throw new Error('Post not found');
  }

  return { post };
});
