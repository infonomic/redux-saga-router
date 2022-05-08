import React from 'react'

import { RouterView } from 'lib/redux-saga-router'

function SessionContainer() {
  return (
    <div>
      <RouterView name="child" />
    </div>

  )
}

export default SessionContainer
