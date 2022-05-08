import { createReducer } from 'store/helpers'
import { mutations } from './actions'

const initialState = {
  initialized: false,
  user: null,
  abilities: [],
  signInActive: false,
  signOutActive: false,
  version: {},
}

const sessionReducer = createReducer(initialState, {
  [mutations.signInStart]: (state, action) => ({
    ...state,
    signInActive: true,
  }),
  [mutations.signInSuccess]: (state, action) => ({
    ...state,
    signInActive: false,
    initialized: true,
    user: action.payload.user,
    abilities: action.payload.abilities,
    version: action.payload.version,
  }),
  [mutations.signInFailure]: (state, action) => ({
    ...state,
    signInActive: false,
    initialized: true,
    user: null,
    abilities: [],
  }),

  [mutations.signOutStart]: (state, action) => ({
    ...state,
    signOutActive: true,
  }),
  [mutations.signOutSuccess]: (state, action) => ({
    ...state,
    signOutActive: false,
    initialized: true,
    user: null,
    abilities: [],
    version: {},
  }),
  [mutations.signOutFailure]: (state, action) => ({
    ...state,
    signOutActive: false,
  }),
})

export default sessionReducer
