import { all, call, fork } from 'redux-saga/effects'

import { watchers as routerWatchers, initializeRouteSaga } from '../lib/redux-saga-router'

export default (routes) =>
    function* rootSaga() {
        yield fork(routerWatchers, routes)
        yield call(initializeRouteSaga, routes, undefined)
    }
