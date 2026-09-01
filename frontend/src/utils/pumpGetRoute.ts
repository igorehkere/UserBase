import {useParams as useReactParams} from 'react-router-dom'

const baseUrl = 'http://localhost:5173/'

type PumpedGetRouteInputBase = {
    abs?: boolean
}

function pumpGetRoute<T extends Record<string, boolean>>(
    routeParamsDefinition: T,
    getRoute: (routeParams: Record<keyof T, string>) => string
): {
    (routeParams: Record<keyof T, string> & PumpedGetRouteInputBase): string
    placeholders: Record<keyof T, string>
    useParams: () => Record<keyof T, string>
    definitions: string
}

function pumpGetRoute(getRoute: () => string): {
    (routeparams?: PumpedGetRouteInputBase): string
    placeholders: {}
    useParams: () => {}
    definitions: string
}

function pumpGetRoute(routeParamsOrGetRoute?: any, maybeGetRoute?: any) {
    const routeParamsDefinition = typeof routeParamsOrGetRoute === 'function' ? {} : routeParamsOrGetRoute
    const getRoute = typeof routeParamsOrGetRoute === 'function' ? routeParamsOrGetRoute : maybeGetRoute
    const placeholders = Object.keys(routeParamsDefinition).reduce((acc, key) => ({...acc, [key]: `:${key}`}), {})
    const definitions = getRoute(placeholders)
    const pumpedGetRoute = (routeParams?: PumpedGetRouteInputBase) => {
        const route = getRoute(routeParams)
        if (routeParams?.abs) {
            return `${baseUrl}${route}`
        } else {
            return route
        }
    }
    pumpedGetRoute.placeholders = placeholders
    pumpedGetRoute.definitions = definitions
    pumpedGetRoute.useParams = useReactParams as any

    return pumpedGetRoute
}

export const pgr = pumpGetRoute