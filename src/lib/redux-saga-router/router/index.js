/* eslint-disable import/no-cycle */

import React from 'react'

export const RouterContext = React.createContext({})
export { default as prepareRoutes } from './prepareRoutes'
export { default as RouterView } from './RouterView'
export { default as Router } from './Router'
