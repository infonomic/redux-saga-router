import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { tasks } from 'modules/session/actions'
import { CLEAR, RouterLink, RouterView } from '../lib/redux-saga-router'

import * as L from '../locationTemplates'

function MainLayout() {
  const dispatch = useDispatch()
  const signedIn = useSelector(state => !!state.session.user)

  const handleSignOut = () => {
    dispatch(tasks.signOut())
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <RouterView name="main" />
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <RouterLink to={L.Home.home()} mode={CLEAR} exact>
          Home
        </RouterLink>
        <RouterLink to={L.News.news()} mode={CLEAR} exact>
          News
        </RouterLink>
        {
        signedIn
          ? (
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          )
          : (
            <RouterLink to={L.Session.signIn()} mode={CLEAR} exact>
              Sign In
            </RouterLink>
          )
        }
      </div>
    </div>
  )
}

export default MainLayout
