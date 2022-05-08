import { all, call, fork } from 'redux-saga/effects'

import { watchers as routerWatchers, initializeRouteSaga } from '../lib/redux-saga-router'
import { watchers as sessionWatchers } from '../modules/session/sagas'

import { notFoundLocation } from '../locationTemplates'

const watcherSagas = [
  sessionWatchers,
]

// Root Saga
// eslint-disable-next-line import/no-anonymous-default-export
export default routes => (function* rootSaga() {
  // Start all the watcher sagas
  yield all(watcherSagas.map(fork))
  // yield fork(routerWatchers, routes, '/portal')
  yield fork(routerWatchers, routes)

  // Attempt to restore session (and block until complete)
  // yield call(sessionSagas.restore)
  // This is now handled per-route, via withAuthChecks in routerHelpers.js

  // Navigate to the current location (triggering the corresponding
  // action, if any)
  // yield call(initializeRouteSaga, routes, '/portal')
  yield call(initializeRouteSaga, routes, undefined, notFoundLocation)
})
