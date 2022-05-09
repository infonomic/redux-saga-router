/**
 * An example RouterLink component
 *
 */
import React, { useCallback, forwardRef } from 'react'

import { useDispatch } from 'react-redux'
import { useIsActive } from '../hooks'
import { navigate } from '../redux'

const RouterLink = forwardRef((props, ref) => {
  const {
    to,
    mode,
    exact,
    className,
    style,
    children,
    onBefore,
    onClick: _onClickProp,
    href: _hrefProp,
    ...rest
  } = props

  const dispatch = useDispatch()

  const onClick = useCallback(
    event => {
      if (onBefore) onBefore()
      event.preventDefault()
      dispatch(navigate(to, mode))
    },
    [onBefore, dispatch, mode, to]
  )

  // NOTE: This is the only difference between this component, and Link.js -
  // it allows this component to determine if it is the parent of the current
  // location or component (e.g. if this was the link to /users, and the current
  // route or component was /users/id/edit - then this components
  // isActive flag would be true!)
  const isActive = useIsActive(to, exact)

  return (
    <a
      ref={ref}
      href={to.path}
      onClick={onClick}
      isactive={isActive.toString()}
      {...rest}
    >
      {children}
    </a>
  )
})

export default RouterLink
