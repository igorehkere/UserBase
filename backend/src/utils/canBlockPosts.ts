import type { Post, User, UserPersmissions } from "@prisma/client";


type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybePost = Pick<Post, 'authorId'> | null

const hasPermission = (user: MaybeUser, permission: UserPersmissions) => {
    return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockPosts = (user: MaybeUser) => {
    return hasPermission(user, 'BLOCK_POST')
}

export const canEditPost = (user: MaybeUser, post: MaybePost) => {
    return !!user && !!post && user?.id === post?.authorId
}