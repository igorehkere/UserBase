import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpc } from "../lib/trpc";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createPostTrpcRoute } from './createPost'
import { getMeTrpcRoute } from './getMe'
import { getPostTrpcRoute } from './getPost'
import { getPostsTrpcRoute } from './getPosts'
import { getUserTrpcRoute } from './getUser'
import { getUsersTrpcRoute } from './getUsers'
import { SignInTrpcRoute } from './SignIn'
import { signUpTrpcRoute } from './signUp'
import { updatePostTrpcRoute } from './updatePost'
// @endindex




export const trpcRouter = trpc.router({
    // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
    createPost: createPostTrpcRoute,
    getMe: getMeTrpcRoute,
    getPost: getPostTrpcRoute,
    getPosts: getPostsTrpcRoute,
    getUser: getUserTrpcRoute,
    getUsers: getUsersTrpcRoute,
    SignIn: SignInTrpcRoute,
    signUp: signUpTrpcRoute,
    updatePost: updatePostTrpcRoute,
    // @endindex

})

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>