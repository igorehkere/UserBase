import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type AppContext } from "./ctx";
import { type ExpressRequest } from "../utils/types";

const getCreateTrpcContext = (appContext: AppContext) => ({req}: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null
})
type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>

export const trpc = initTRPC.context<TrpcContext>().create();

export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
    expressApp.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
            router: trpcRouter,
            createContext: getCreateTrpcContext(appContext),
        })
    )
}