import { trpc } from '../../lib/trpc';

export const getPostsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const posts = await ctx.prisma.post.findMany({
    select: {
      id: true,
      text: true,
      createdAt: true,
      authorId: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return { posts };
});
