/**
 * Helper to create router context value, which contains
 * the route map, and a few redux selectors that depend
 * on the route map.
 */

import { createSelector } from 'reselect'
import { selectCurrentLocation, selectLocationStack } from '../redux'

const createRouterContext = (routes) => {
    // Simple, non-memoizing selector is fine here.
    const selectCurrentRoute = (state) =>
        routes[state.router.currentLocation.name]

    // Memoize the calculation of breadcrumbs
    const selectBreadcrumbs = createSelector(
        selectCurrentLocation,
        selectLocationStack,
        (currentLocation, locationStack) => {
            const breadcrumbs = locationStack.map((location) => ({
                location,
                title: routes[location.name].title,
                icon: routes[location.name]?.icon,
            }))

            breadcrumbs.push({
                location: currentLocation,
                title: routes[currentLocation.name].title,
                icon: routes[currentLocation.name]?.icon,
                current: true,
            })

            return breadcrumbs
        }
    )

    // Memoize the calculation of ancestors (i.e. the current location,
    // the parent location, the parent of that location, and so on).
    const selectAncestors = createSelector(
        selectCurrentLocation,
        (currentLocation) => {
            const ancestors = [currentLocation]
            let route = routes[currentLocation.name]

            while (route.parent) {
                route = routes[route.parent.name]
                ancestors.push(route.template(currentLocation.params))
            }
            return ancestors
        }
    )

    // Construct value for RouterContext.Provider below.
    return {
        routes,
        selectCurrentRoute,
        selectBreadcrumbs,
        selectAncestors,
    }
}

export default createRouterContext
