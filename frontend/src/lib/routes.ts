const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
    return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllPostsRoute = () => '/';
export const viewUserRouteParams = getRouteParams({ userName: true })
export type ViewUserRouteParams = typeof viewUserRouteParams;
export const getViewUserRoute = ({userName}: ViewUserRouteParams) => `/users/${userName}`
// export const getNewIdeaRoute = () => '/ideas/new'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'
export const getMyProfileRoute = () => '/profile'
export const notFoundRoute = () => '/not-found'