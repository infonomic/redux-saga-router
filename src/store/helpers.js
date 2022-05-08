import produce from 'immer'

export function createAction(type) {
  const actionCreator = payload => ({ type, payload })
  actionCreator.type = type
  actionCreator.toString = () => `${type}`
  actionCreator.match = action => action.type === type
  return actionCreator
}

export function createActions(baseName, methodNames) {
  const result = {}
  methodNames.forEach(methodName => {
    const type = `${baseName}/${methodName}`
    result[methodName] = createAction(type)
  })
  return result
}

export function createReducer(initialState, handlers) {
  // TODO: fix
  // eslint-disable-next-line default-param-last
  return (state = initialState, action) => {
    const handler = handlers[action.type]
    if (handler) return handler(state, action)
    else return state
  }
}

export function createImmerReducer(initialState, handlers) {
  return produce((state, action) => {
    const handler = handlers[action.type]
    if (handler) return handler(state, action)
    else return undefined
  }, initialState)
}
