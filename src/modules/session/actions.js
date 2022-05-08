import { createAction } from 'store/helpers'

export const mutations = {
  signInStart: createAction('session/signInStart'),
  signInSuccess: createAction('session/signInSuccess'),
  signInFailure: createAction('session/signInFailure'),

  signOutStart: createAction('session/signOutStart'),
  signOutSuccess: createAction('session/signOutSuccess'),
  signOutFailure: createAction('session/signOutFailure'),
}

// Tasks (redux actions for triggering sagas etc)
export const tasks = {
  signIn: createAction('session/signIn'),
  signOut: createAction('session/signOut'),
}
