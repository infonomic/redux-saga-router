import * as L from '../../locationTemplates'
import NewsPage from './components/NewsPage'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    template: L.News.news,
    title: 'News',
    requiresAuth: false, // Access option
    components: {
      main: NewsPage,
    },
  },
]
