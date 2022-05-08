import * as L from '../../locationTemplates'
import HomePage from './components/HomePage'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    template: L.Home.home,
    title: 'Home',
    requiresAuth: false, // Access option
    components: {
      main: HomePage,
    },
  },
]
