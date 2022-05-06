import React from 'react'

export const RouterContext = React.createContext({})

export { default as createRouterContext } from './createRouterContext'
export { default as prepareRoutes } from './prepareRoutes'

export { default as Router } from './Router'
export { default as RouterView } from './RouterView'
export { default as RouterLink } from './RouterLink'
