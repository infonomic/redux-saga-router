import React from 'react'

import { RouterView } from 'lib/redux-saga-router'

function SessionContainer() {
  return (
    <RouterView name="child" />
  )
}

export default SessionContainer
