import { toClientMe } from "../../../lib/models";
import { trpcLoggerProcedure } from "../../../trpc";
import { zEditProfileTrpcInput } from "./input";


export const editProfileTrpcRoute = trpcLoggerProcedure.input(zEditProfileTrpcInput).mutation(async ({ctx, input}) => {
    if (!ctx.me) {
        throw new Error('Only authorizated')
    }
    if (ctx.me.nick !== input.nick) {
        const exUser = await ctx.prisma.user.findUnique({
            where: {
                nick: input.nick
            }
        })
        if (exUser) {
            throw new Error('Пользователь с таким ником уже существует')
        }
    }
    const updatedMe = await ctx.prisma.user.update({
        where: {
            id: ctx.me.id
        },
        data: input
    })
    ctx.me = updatedMe
    return toClientMe(updatedMe)
})