import { combineReducers } from 'redux'
import { createRouterReducer } from '../lib/redux-saga-router'
import { defaultLocation } from '../locationTemplates'

const rootReducer = combineReducers({
    router: createRouterReducer(defaultLocation),
})

export default rootReducer