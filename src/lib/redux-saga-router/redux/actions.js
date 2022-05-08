/**
 * Action types
 */
export const NAVIGATE = 'router/navigate'
export const SET_LOCATION = 'router/setLocation'

/**
 * Mode constants for navigate/set_location actions
 */
export const PUSH = 'PUSH'
export const CLEAR = 'CLEAR'

/**
 * Actions
 */
export const navigate = (to, mode) => {
  return {
    type: NAVIGATE,
    payload: { to, mode },
  }
}

export const setLocation = (to, mode) => {
  return {
    type: SET_LOCATION,
    payload: { to, mode },
  }
}
