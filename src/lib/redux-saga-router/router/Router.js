/**
 * Router component
 */

import { useEffect, useMemo } from 'react'
import { useStore } from 'react-redux'
import { RouterContext } from '.'
import { navigate } from '../redux'
import createRouterContext from './createRouterContext'

function Router({ routes, children }) {
    const context = useMemo(() => createRouterContext(routes), [routes])

    const store = useStore()
    useEffect(() => {
        const popStateListener = () => {
            const routerState = store.getState().router
            const backLocation =
                routerState.locationStack[
                    routerState.locationStack.length - 1
                ] || routerState.defaultLocation

            // window.history.replaceState(false, '', backLocation.path)
            window.history.pushState(true, '', backLocation.path)
            store.dispatch(navigate(backLocation))
        }

        window.addEventListener('popstate', popStateListener)
        return () => {
            window.removeEventListener('popstate', popStateListener)
        }
    }, [store])

    return (
        <RouterContext.Provider value={context}>
            {children}
        </RouterContext.Provider>
    )
}

export default Router
