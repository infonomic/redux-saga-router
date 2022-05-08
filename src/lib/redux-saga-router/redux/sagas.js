import {
  takeLeading, put, select, takeLatest, call,
} from 'redux-saga/effects'
import {
  NAVIGATE, navigate, setLocation, SET_LOCATION,
} from './actions'

export function* watchers(routes, prefix) {
  // eslint-disable-next-line require-yield
  yield takeLatest(SET_LOCATION, function* updateLocation({ payload: { to } }) {
    let { path } = to
    if (prefix && prefix !== '/') {
      if (path === '/') {
        path = prefix
      } else {
        path = `${prefix}${path}`
      }
    }
    window.history.replaceState(to, '', path)
    const route = routes[to.name]
    if (!route.noScrollToTop) {
      window.scrollTo(0, 0)
    }
  })

  yield takeLeading(NAVIGATE, function* handleNavigation(action) {
    const {
      payload: { to, mode },
    } = action
    const route = routes[to.name]
    if (route.saga) {
      yield call(route.saga, action)
    } else {
      yield put(setLocation(to, mode))
    }
  })
}

export function* initializeRouteSaga(routes, prefix, notFoundLocation) {
  let initialLocation = notFoundLocation
  if (!initialLocation) {
    initialLocation = yield select(state => state.router.defaultLocation)
  }

  // TODO: Should we use toLowerCase() here?
  let initialPath = window.location.pathname.toLowerCase()
  if (prefix && prefix !== '/') {
    if (initialPath === prefix || initialPath.startsWith(`${prefix}/`)) {
      initialPath = initialPath.substring(prefix.length) || '/'
    } else {
      initialPath = null
    }
  }

  if (initialPath) {
    let paramCount
    const pathParts = initialPath.split('/').slice(1)

    const sortedRoutes = Object.values(routes)
    sortedRoutes.sort((a, b) => a.template.path < b.template.path)
    // eslint-disable-next-line no-restricted-syntax
    for (const route of sortedRoutes) {
      const match = route.template.match(pathParts)
      if (
        match
                && (paramCount === undefined
                    || paramCount > route.template.params.length)
      ) {
        initialLocation = match
        paramCount = route.template.params.length
      }
    }
  }

  if (!window.history.state) {
    window.history.replaceState(false, '', prefix || '/')
    window.history.pushState(
      true,
      '',
      `${prefix || ''}${initialLocation.path}`
    )
  } else {
    window.history.replaceState(
      true,
      '',
      `${prefix || ''}${initialLocation.path}`
    )
  }

  yield put(navigate(initialLocation))
}
