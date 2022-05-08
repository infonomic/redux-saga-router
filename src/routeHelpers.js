/* eslint-disable max-len */
import { put, select, call } from 'redux-saga/effects'
import { setLocation } from './lib/redux-saga-router'
import * as L from './locationTemplates'

/**
 * Transforms a list of route config objects, adding an auth check to all that
 * require it.
 */
export const withAuthChecks = routeList => routeList.map(addAuthCheck)


/**
 * Adds a saga for checking authentication to any route config that has the
 * 'requiresAuth' flag set.
 */
const addAuthCheck = route => {
  if (route.requiresAuth) {
    return {
      ...route,
      saga: createAuthCheckSaga(route.saga),
    }
  } else {
    return route
  }
}


/**
 * Takes an (optional) saga for performing the navigation to a given route and
 * wraps it with an auth check.
 */
const createAuthCheckSaga = navSaga => {
  return function* authCheckSaga(action) {
    // Fetch the session state from the redux store.
    const session = yield select(state => state.session)
    // Check whether the user is currently authenticated.  NOTE: This assumes
    // session.user === null whenever the user is not authenticated.
    if (!session.user) {
      // First, attempt to restore the user's session, but only if the session
      // is uninitialized.  This means we'll only try restoring the session if
      // we've never previously completed a session restore, sign-in or
      // sign-out.

      // NOTE: for this example app only, we're commenting out all API
      // and session requests, so we'll hard code a failed session restore
      // here.
      // const sessionRestored = !session.initialized && (yield call(sessionSagas.restore))
      const sessionRestored = false

      // If restoration failed, redirect to the sign-in page and return early.
      // Otherwise, fall-through so we can continue navigating to the
      // requested route.
      if (!sessionRestored) {
        // yield put(setLocation(L.Session.signIn(null, { redirect: action.payload.to })))
        yield put(setLocation(L.Session.signIn(null, { redirect: action.payload.to }), action.payload.mode))
        return // early exit
      }
    }

    // The user is authenticated...  continue with navigation.
    if (navSaga) {
      yield call(navSaga, action)
    } else {
      const { payload: { to, mode } } = action
      yield put(setLocation(to, mode))
    }
  }
}
