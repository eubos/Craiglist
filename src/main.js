import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import BuyModalComponent from '@/components/Shared/BuyModal'

Vue.use(Vuetify)
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyDU_xqmrBOQzLElwLjxz8c6SqNNck1tLEY',
      authDomain: 'craiglist-fbffa.firebaseapp.com',
      databaseURL: 'https://craiglist-fbffa.firebaseio.com',
      projectId: 'craiglist-fbffa',
      storageBucket: 'craiglist-fbffa.appspot.com',
      messagingSenderId: '609098873029'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
