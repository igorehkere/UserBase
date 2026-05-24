import type { TrpcRouter } from "@authwithback/backend/src/trpc";
import { createTRPCReact } from "@trpc/react-query";


export const trpc = createTRPCReact<TrpcRouter>()