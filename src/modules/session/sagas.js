import { put, select, takeLatest } from 'redux-saga/effects'
import * as L from 'locationTemplates'

import { navigate, selectCurrentLocation } from 'lib/redux-saga-router'
import { mutations, tasks } from './actions'

export const sagas = {
  * signIn({ payload: { data } }) {
    yield put(mutations.signInStart())
    
    // Fake auth details. Implement your authn strategy here
    try {
      const user = {
        id: '01FS6MKNMEPRW8V6MSR7976ZCC',
        username: 'bob',
        first_name: 'Bob',
        last_name: 'Bowden',
        email: 'bounce+label1@simulator.amazonses.com',
      }
      const abilities = [
        'account:delete_own',
        'account:edit_own',
        'account:read_own',
        'products:create_own',
        'products:delete_own',
        'products:edit_own',
        'products:read_own',
      ]

      const version = '1.0.0'

      yield put(mutations.signInSuccess({ user, abilities, version }))

       // Notify with your messaging / alert/ toast system

      // Figure out correct location for redirecting after sign-in
      const redirectLocation = yield select(state => {
        // If the current (sign-in) location has a redirect action in its query
        // (perhaps put there by the authCheck saga) then simply navigate there.
        const currentLocation = selectCurrentLocation(state)
        if (currentLocation.query?.redirect) {
          return currentLocation.query.redirect
        }

        // Fallback -- navigate to the default location
        return L.defaultLocation
      })
      yield put(navigate(redirectLocation))
      // Notify with your messaging / alert/ toast system
    } catch (error) {
      yield put(mutations.signInFailure())
      // Notify with your messaging / alert/ toast system
    }
  },

  * signOut() {
    yield put(mutations.signOutStart())
    try {
      yield put(mutations.signOutSuccess())
      yield put(navigate(L.Session.signIn()))
      // Notify with your messaging / alert/ toast system
    } catch (error) {
      yield put(mutations.signOutFailure())
      // Notify with your messaging / alert/ toast system
    }
  },
}

export function* watchers() {
  yield takeLatest(tasks.signIn.type, sagas.signIn)
  yield takeLatest(tasks.signOut.type, sagas.signOut)
}
