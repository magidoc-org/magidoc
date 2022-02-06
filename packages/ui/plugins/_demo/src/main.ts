import QueryGeneratorPlugin from '../../query-generator/src/index'
import SearchPlugin from '../../search/src/index'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(QueryGeneratorPlugin)
app.use(SearchPlugin)

app.mount('#app')
