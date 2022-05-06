import * as L from '../../locationTemplates'
import HomePage from './components/HomePage'

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