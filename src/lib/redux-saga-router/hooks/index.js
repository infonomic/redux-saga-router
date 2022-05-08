import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { locationsEqual } from '../locations'
import { selectCurrentLocation, selectLocationStack } from '../redux'
import { RouterContext } from '../router'

export const useCurrentLocation = () => {
  return useSelector(selectCurrentLocation)
}

export const useLocationStack = () => {
  return useSelector(selectLocationStack)
}

export const useParams = () => {
  const currentLocation = useSelector(selectCurrentLocation)
  return currentLocation.params
}

export const useCurrentRoute = () => {
  const { selectCurrentRoute } = useContext(RouterContext)
  return useSelector(selectCurrentRoute)
}

export const useBreadcrumbs = () => {
  const { selectBreadcrumbs } = useContext(RouterContext)
  return useSelector(selectBreadcrumbs)
}

export const useIsActive = (location, exact) => {
  const { selectAncestors } = useContext(RouterContext)
  const ancestors = useSelector(selectAncestors)
  if (location) {
    return exact
      ? locationsEqual(location, ancestors[0])
      : ancestors.some(ancestor => locationsEqual(location, ancestor))
  } else {
    return false
  }
}
