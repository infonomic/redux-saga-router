const sessionStorageKeys = ['router']

export const browserStorageEnhancer = next => (reducer, preloadedState) => {
  const sessionStorageState = {}
  sessionStorageKeys.forEach(key => {
    try {
      const rawVal = sessionStorage.getItem(key)
      if (rawVal != null) {
        sessionStorageState[key] = JSON.parse(rawVal)
      }
    } catch (err) {
      sessionStorage.remove(key)
    }
  })

  const store = next(reducer, Object.assign(sessionStorageState, preloadedState))

  const updateSessionStorage = () => {
    const state = store.getState()
    sessionStorageKeys.forEach(key => {
      if (sessionStorageState[key] !== state[key]) {
        sessionStorageState[key] = state[key]
        sessionStorage.setItem(key, JSON.stringify(sessionStorageState[key]))
      }
    })
  }

  updateSessionStorage()
  store.subscribe(updateSessionStorage)

  return store
}
