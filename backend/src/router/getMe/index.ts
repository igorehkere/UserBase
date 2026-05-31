import { trpc } from "../../lib/trpc";
import _ from "lodash";

export const getMeTrpcRoute = trpc.procedure.query(({ctx}) => {
    return {me: ctx.me && _.pick(ctx.me, ['id', 'nick', 'firstname'])}
})