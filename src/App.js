import React, { Suspense } from 'react'
import { Router, RouterView } from './lib/redux-saga-router'
import routes from './routes'
import MainLayout from './ui/MainLayout'

function App() {
  return (
    <Router routes={routes}>
      <Suspense fallback={(<div>Waiting...</div>)}>
        <RouterView name="layout" defaultComponent={MainLayout} />
      </Suspense>
    </Router>
  )
}

export default App
