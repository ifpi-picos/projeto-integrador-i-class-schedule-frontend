import Vue from 'vue'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import store from './store/'
import router from './routes/router'
import VueSweetalert2 from 'vue-sweetalert2'
import { api } from './services/api'
import { debounce } from './plugins/debounce'

import { credentials } from './helpers/index'

import './services/axios.js'

import Swal from 'sweetalert2/dist/sweetalert2.js'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

// router setup
// plugin setup
Vue.use(DashboardPlugin)
Vue.use(VueSweetalert2)
Vue.use({
  install (Vue) {
    Vue.prototype.$debounce = debounce
  }
})

window.toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})



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
      } catch {
        localStorage.clear()
      }
    }
    // if (token && Response.auth) {
    //   credentials(Response)
    //   router.push({ name: 'dashboard' })
    // }
  }
})
