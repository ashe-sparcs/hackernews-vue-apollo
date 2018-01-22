// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'tachyons'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

import Vue from 'vue'
import App from './App'
import router from './router'

import { API_USER_ID, API_AUTH_TOKEN } from './constants/settings'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql/',
  credentials: 'same-origin'
})

const wsClient = new SubscriptionClient('__SUBSCRIPTION_API_ENDPOINT__', {
  reconnect: true,
  connectionParams: {
    authToken: localStorage.getItem(GC_AUTH_TOKEN)
  }
})

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: localStorage.getItem(API_AUTH_TOKEN) || null
    }
  })
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

console.log(middlewareLink)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

let userId = localStorage.getItem(API_USER_ID)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  data: {
    userId
  },
  components: { App },
  template: '<App/>'
})
