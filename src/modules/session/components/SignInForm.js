import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { tasks as sessionTasks } from '../actions'


function SignInForm() {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const signInActive = useSelector(state => state.session.signInActive)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async done => {
    dispatch(sessionTasks.signIn({
      data: {
        username: 'foo', password: 'bar'
      },
    }))
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <form noValidate autoComplete="off">
          <input
            style={{ marginBottom: '1.25em' }}
            required
            id="username"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value.trim())}
          />
          <input
            required
            type="password"
            id="password"
            variant="outlined"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
          />
        <button onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignInForm
