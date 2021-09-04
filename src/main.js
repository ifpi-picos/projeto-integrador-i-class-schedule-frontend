import Vue from 'vue'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import store from './store/'
import router from './routes/router'
import { api } from './services/api'

import { credentials } from './helpers/index'

import './services/axios.js'
import './plugins/prettyAlerts.js'
import './plugins/debounce'

// router setup
// plugin setup
Vue.use(DashboardPlugin)

export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  // beforeCreate: () => autenticate()
  beforeCreate: async () => {
    const token = window.localStorage.getItem('token')
    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user) {
      try {
        const { data } = await api.verifyToken({
          email: user.email,
          name: user.name,
          token
        })

        credentials(data)
      } catch ({ response }) {
        window.localStorage.clear()
      }
    }
    // if (token && Response.auth) {
    //   credentials(Response)
    //   router.push({ name: 'dashboard' })
    // }
  }
})
