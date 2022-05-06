import * as L from '../../locationTemplates'
import NewsPage from './components/NewsPage'

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