import { prepareRoutes } from './lib/redux-saga-router'

import homeRoutes from './modules/home/route'
import newsRoutes from './modules/news/route'

export default prepareRoutes([...homeRoutes, ...newsRoutes])
