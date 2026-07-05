import z from "zod";
import { trpc } from '../../../lib/trpc';

export const getUserTrpcRoute = trpc.procedure
  .input(
    z.object({
      userName: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.userName,
      },
    });
    return { user };
  });
