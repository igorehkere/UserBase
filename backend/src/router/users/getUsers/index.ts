import { trpc } from '../../../lib/trpc';
import { zGetUsersTrpcInput } from "./input";


export const getUsersTrpcRoute = trpc.procedure.input(zGetUsersTrpcInput).query(async ({ctx, input}) => {

  const noramalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined
  const users = await ctx.prisma.user.findMany({
    select: {
      id: true,
      nick: true,
      firstname: true,
      lastname: true,
      serialNumber: true
    },
    where: !input.search ? undefined : {
      OR: [{
        nick: {
          search: noramalizedSearch
        }
      }, {
        firstname: {
          search: noramalizedSearch
        }
      }, {
        lastname: {
          search: noramalizedSearch
        }
      }]
    },
    cursor: input.cursor ? {serialNumber: input.cursor} : undefined,
    take: input.limit + 1,
    orderBy: [{
      createdAt: 'desc'
    }, {
      serialNumber: 'desc'
    }]
  })

  const nextUser = users.at(input.limit)
  const nextCursor = nextUser?.serialNumber
  const usersExceptNext = users.splice(0, input.limit)
  return {users: usersExceptNext, nextCursor}
})