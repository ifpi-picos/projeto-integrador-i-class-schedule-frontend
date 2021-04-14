import Vue from 'vue'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import firebase from './firebase'
// import store from './store/'
import router from './routes/router'
// import moment from 'moment'

// Vue.prototype.moment = moment

// Vue.filter('formatTime', function (value) {
//   if (value) {
//     console.log(String(value))
//     return moment(String(value)).format('hh:mm')
//   }
// })

// router setup
// plugin setup
Vue.use(DashboardPlugin)
Vue.use(firebase)

export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
  // store
})
