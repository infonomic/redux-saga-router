/**
 * RouterView component
 *
 * If there is a current location (i.e. state.router.currentLocation is not
 * null) display the component for the associated route whose name matches this
 * RouterView's name, falling back to the (optional) defaultComponent if the
 * route doesn't have a component with that name.  If there is no current
 * location, or if the component above is null/undefined, fall-back to
 * displaying the children of this routerview (which otherwise will not be
 * displayed).
 */

import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { RouterContext } from '../router'
import { selectCurrentLocation } from '../redux/selectors'

function RouterView({ name, defaultComponent }) {
    const { routes } = useContext(RouterContext)
    const Component = useSelector((state) => {
        const currentLocation = selectCurrentLocation(state)
        if (currentLocation) {
            return (
                routes[currentLocation.name].components[name] ||
                defaultComponent
            )
        } else {
            return null
        }
    })

    return Component ? <Component /> : null
}

export default RouterView
