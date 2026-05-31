import type { TrpcRouter } from "@authwithback/backend/src/router";
import { createTRPCReact } from "@trpc/react-query";


export const trpc = createTRPCReact<TrpcRouter>()