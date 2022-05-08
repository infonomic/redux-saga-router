import MainLayout from 'ui/MainLayout'
import * as L from 'locationTemplates'
import NotFound from './components/NotFound'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    template: L.NotFound.notfound,
    title: 'Not Found',
    requiresAuth: false,
    components: {
      layout: MainLayout,
      main: NotFound,
    },
  },
]
