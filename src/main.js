import './assets/main.css'

import { createApp, h, provide } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import router from './components/router'

const httpLink = createHttpLink({
  uri: 'https://countries.trevorblades.com/'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})

app.use(router)
app.mount('#app')
//createApp(App).mount('#app')
