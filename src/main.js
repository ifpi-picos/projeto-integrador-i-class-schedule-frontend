import Vue from 'vue'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import firebase from './firebbase'

// router setup
import router from './routes/router'
// plugin setup
Vue.use(DashboardPlugin)
Vue.use(firebase)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
