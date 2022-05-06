/* eslint-disable no-param-reassign */

import { isEmpty, isEqual, pick } from 'lodash'

/**
 * Test whether two location parameter maps are equal
 */
const paramsEqual = (params1, params2) => {
    return isEqual(params1, params2) || (isEmpty(params1) && isEmpty(params2))
}

/**
 * Test whether two locations are equal
 */
export const locationsEqual = (loc1, loc2) => {
    // TODO: Can we just check the locations' paths for equality?
    return loc1.name === loc2.name && paramsEqual(loc1.params, loc2.params)
}

/**
 * Returns a function for creating locations with the given name, parameters
 * and path.
 */
export const createLocationTemplate = (options) => {
    const { name, path } = options

    const paramNames = options.params ? [...options.params] : []
    paramNames.sort().reverse()
    const locationTemplate = (params, query) => {
        const result = {
            name,
            params: pick(params, paramNames),
            path: paramNames.reduce(
                (acc, key) => acc.replace(`:${key}`, params[key]),
                path
            ),
        }
        if (query) {
            result.query = query
        }
        return result
    }

    const parts = path.split('/').slice(1)
    const match = (urlParts) => {
        if (parts.length !== urlParts.length) {
            return null
        }

        const params = {}
        for (let i = 0; i < parts.length; i += 1) {
            if (parts[i].startsWith(':')) {
                params[parts[i].slice(1)] = urlParts[i]
            } else if (parts[i] !== urlParts[i]) {
                return null
            }
        }
        return locationTemplate(params)
    }

    Object.defineProperties(locationTemplate, {
        name: { value: name },
        params: { value: paramNames },
        path: { value: path },
        match: { value: match },
    })

    return locationTemplate
}
