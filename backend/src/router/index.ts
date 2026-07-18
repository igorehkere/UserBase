import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpc } from "../lib/trpc";
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createPostTrpcRoute } from './posts/createPost'
import { getPostTrpcRoute } from './posts/getPost'
import { getPostsTrpcRoute } from './posts/getPosts'
import { setPostLikeTrpcRoute } from './posts/setPostLike'
import { updatePostTrpcRoute } from './posts/updatePost'
import { editProfileTrpcRoute } from './users/editProfile'
import { getMeTrpcRoute } from './users/getMe'
import { getUserTrpcRoute } from './users/getUser'
import { getUsersTrpcRoute } from './users/getUsers'
import { SignInTrpcRoute } from './users/SignIn'
import { signUpTrpcRoute } from './users/signUp'
// @endindex




export const trpcRouter = trpc.router({
    // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
    createPost: createPostTrpcRoute,
    getPost: getPostTrpcRoute,
    getPosts: getPostsTrpcRoute,
    setPostLike: setPostLikeTrpcRoute,
    updatePost: updatePostTrpcRoute,
    editProfile: editProfileTrpcRoute,
    getMe: getMeTrpcRoute,
    getUser: getUserTrpcRoute,
    getUsers: getUsersTrpcRoute,
    SignIn: SignInTrpcRoute,
    signUp: signUpTrpcRoute,
    // @endindex

})

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>