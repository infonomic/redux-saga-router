import Home from './modules/home/locations'
import NotFound from './modules/404/locations'

export { default as Home } from './modules/home/locations'
export { default as News } from './modules/news/locations'
export { default as Session } from './modules/session/locations'
export { default as NotFound } from './modules/404/locations'

export const defaultLocation = Home.home()
export const notFoundLocation = NotFound.notfound()
