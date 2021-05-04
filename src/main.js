import Vue from 'vue'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import firebase from './firebase'
// import store from './store/'
import router from './routes/router'
import VueSweetalert2 from 'vue-sweetalert2'

import Swal from 'sweetalert2/dist/sweetalert2.js'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

// router setup
// plugin setup
Vue.use(DashboardPlugin)
Vue.use(firebase)
Vue.use(VueSweetalert2)

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
  router
  // store
})
