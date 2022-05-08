import { createLocationTemplate } from 'lib/redux-saga-router'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signIn: createLocationTemplate({
    name: 'session/signIn',
    path: '/sign-in',
  }),
}
