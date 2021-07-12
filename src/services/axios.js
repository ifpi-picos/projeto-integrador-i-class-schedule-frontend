import { api } from './api'
import Vue from 'vue'

Vue.use({
  install (Vue) {
    Vue.prototype.$axios = api
  }
})
