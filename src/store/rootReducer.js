import { combineReducers } from 'redux'
import session from '../modules/session/reducers'
import { createRouterReducer } from '../lib/redux-saga-router'
import { defaultLocation } from '../locationTemplates'

const rootReducer = combineReducers({
  router: createRouterReducer(defaultLocation),
  session,
})

export default rootReducer
