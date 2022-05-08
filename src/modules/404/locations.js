import { createLocationTemplate } from 'lib/redux-saga-router'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  notfound: createLocationTemplate({
    name: 'notfound',
    path: '/notfound',
  }),
}
