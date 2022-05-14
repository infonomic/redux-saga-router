import { createReducer } from 'store/helpers'
import { mutations } from './actions'

const initialState = {
  signInStatus: 'idle', // busy, succeeded, failed
  signOutStatus: 'idle', // busy, succeeded, failed,
  initialized: false,
  user: null,
  abilities: [],
  version: {},
}

const sessionReducer = createReducer(initialState, {
  [mutations.signInStarted]: (state, action) => ({
    ...state,
    signInStatus: 'busy',
  }),

  [mutations.signInSucceeded]: (state, action) => ({
    ...state,
    signInStatus: 'idle',
    initialized: true,
    user: action.payload.user,
    abilities: action.payload.abilities,
    version: action.payload.version,
  }),

  [mutations.signInFailed]: (state, action) => ({
    ...state,
    signInStatus: 'failed',
    initialized: true,
    user: null,
    abilities: [],
  }),

  [mutations.signOutStarted]: (state, action) => ({
    ...state,
    signOutStatus: 'busy',
  }),

  [mutations.signOutSucceeded]: (state, action) => ({
    ...state,
    signOutStatus: 'idle',
    initialized: true,
    user: null,
    abilities: [],
    version: {},
  }),

  [mutations.signOutFailed]: (state, action) => ({
    ...state,
    signOutStatus: 'failed',
  }),
})

export default sessionReducer
