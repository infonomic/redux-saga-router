/**
 * Create a global mapping of route names to route configurations, and
 * check for duplicate/missing routes etc.
 */

import { difference } from 'lodash'

export const prepareRoutes = routeList => {
  const routes = {}
  routeList.forEach(route => {
    const { name } = route.template
    if (Object.prototype.hasOwnProperty.call(routes, name)) {
      throw new Error(`Duplicate route definition: ${name}`)
    }

    routes[name] = route
  })

  routeList.forEach(({ parent, template }) => {
    if (parent) {
      if (!Object.prototype.hasOwnProperty.call(routes, parent.name)) {
        throw new Error(`Parent route ${parent.name} not found`)
      }

      const d = difference(parent.params, template.params)

      if (d.length > 0) {
        throw new Error(
          `Route ${template.name} missing params [${d.join(
            ', '
          )}] from parent`
        )
      }
    }
  })

  return routes
}
