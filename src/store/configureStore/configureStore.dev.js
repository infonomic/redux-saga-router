// TODO why is this necessary?
/* eslint-disable import/no-import-module-exports */
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
// import { browserStorageEnhancer } from '../browserStorage'
import rootReducer from '../rootReducer'

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      // browserStorageEnhancer,
      applyMiddleware(
        thunk,
        sagaMiddleware
      )
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  store.runSaga = sagaMiddleware.run
  return store
}
