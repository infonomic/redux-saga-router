import React from 'react'
import MainLayout from 'ui/MainLayout'
import { put, select } from 'redux-saga/effects'
import * as L from 'locationTemplates'
import { selectCurrentLocation, setLocation } from 'lib/redux-saga-router'

const SessionPage = React.lazy(() => import(/* webpackChunkName: "session" */'./components/SessionPage'))
const SignInForm = React.lazy(() => import(/* webpackChunkName: "session" */'./components/SignInForm'))

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    template: L.Session.signIn,
    title: 'Sign in',
    * saga({ payload: { to, mode } }) {
      const authenticated = yield select(state => !!state.session.user)
      if (authenticated) {
        yield put(setLocation(L.Home.home()))
      } else if (to.query?.redirect) {
        yield put(setLocation(to, mode))
      } else {
        const currentLocation = yield select(selectCurrentLocation)
        yield put(setLocation(L.Session.signIn(null, { redirect: currentLocation }), mode))
      }
    },
    components: {
      layout: MainLayout,
      main: SessionPage,
      child: SignInForm,
    },
  },
]
