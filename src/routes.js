
import { prepareRoutes } from './lib/redux-saga-router'

import homeRoutes from 'modules/home/routes'
import notFoundRoutes from './modules/404/routes'
import newsRoutes from 'modules/news/routes'
import sessionRoutes from 'modules/session/routes'

import { withAuthChecks } from './routeHelpers'

export default prepareRoutes(withAuthChecks([
  ...homeRoutes,
  ...notFoundRoutes,
  ...newsRoutes,
  ...sessionRoutes,
]))
