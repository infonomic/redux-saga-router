import { createAction } from 'store/helpers'

export const mutations = {
  signInStarted: createAction('session/signInStarted'),
  signInSucceeded: createAction('session/signInSucceeded'),
  signInFailed: createAction('session/signInFailed'),

  signOutStarted: createAction('session/signOutStarted'),
  signOutSucceeded: createAction('session/signOutSucceeded'),
  signOutFailed: createAction('session/signOutFailed'),
}

// Tasks (redux actions for triggering sagas etc)
export const tasks = {
  signIn: createAction('session/signIn'),
  signOut: createAction('session/signOut'),
}
