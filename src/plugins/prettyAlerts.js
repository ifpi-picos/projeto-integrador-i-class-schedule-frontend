// import Swal from 'sweetalert2/dist/sweetalert2.js'
import VueSweetalert2 from 'vue-sweetalert2'
import Vue from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'
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

const prettyAlerts = {
  error (message) {
    window.toast.fire({
      icon: 'error',
      title: message
    })
  },

  info (message) {
    window.toast.fire({
      icon: 'info',
      title: message
    })
  },

  success (message) {
    window.toast.fire({
      icon: 'success',
      title: message
    })
  }
}

Vue.use({
  install (Vue) {
    Vue.prototype.$prettyAlerts = prettyAlerts
  }
})
