
import homeRoutes from 'modules/home/routes'
import newsRoutes from 'modules/news/routes'
import sessionRoutes from 'modules/session/routes'
import notFoundRoutes from './modules/404/routes'
import { prepareRoutes } from './lib/redux-saga-router'

import { withAuthChecks } from './routeHelpers'

export default prepareRoutes(withAuthChecks([
  ...homeRoutes,
  ...notFoundRoutes,
  ...newsRoutes,
  ...sessionRoutes,
]))
