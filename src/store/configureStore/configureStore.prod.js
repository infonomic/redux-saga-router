import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
// import { browserStorageEnhancer } from '../browserStorage'
import rootReducer from '../rootReducer'

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      // browserStorageEnhancer,
      applyMiddleware(
        thunk,
        sagaMiddleware
      )
    )
  )

  store.runSaga = sagaMiddleware.run
  return store
}
