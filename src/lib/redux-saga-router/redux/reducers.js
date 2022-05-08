import produce from 'immer'
import { CLEAR, PUSH, SET_LOCATION } from './actions'

export const createRouterReducer = defaultLocation => {
  const initialState = {
    defaultLocation,
    currentLocation: null,
    locationStack: [],
  }

  const reducer = produce((state, action) => {
    if (action.type === SET_LOCATION) {
      const { to, mode } = action.payload

      // Update locationStack
      if (mode === CLEAR) {
        // eslint-disable-next-line no-param-reassign
        state.locationStack = []
      } else {
        const index = state.locationStack.findIndex(
          loc => loc.name === to.name
        )
        if (index >= 0) {
          state.locationStack.splice(index)
        }
        if (mode === PUSH) {
          state.locationStack.push(state.currentLocation)
        }
      }

      // Update currentLocation
      // eslint-disable-next-line no-param-reassign
      state.currentLocation = action.payload.to
    }
  }, initialState)

  return reducer
}
