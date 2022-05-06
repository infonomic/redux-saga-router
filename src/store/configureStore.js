import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            sagaMiddleware
        )
    )

    store.runSaga = sagaMiddleware.run
    return store
}