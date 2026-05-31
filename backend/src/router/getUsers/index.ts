import { trpc } from "../../lib/trpc";


export const getUsersTrpcRoute = trpc.procedure.query(async ({ctx}) => {
  const users = await ctx.prisma.user.findMany({
    select: {
      id: true,
      nick: true,
      firstname: true,
      lastname: true,
    }
  })
  return {users}
})