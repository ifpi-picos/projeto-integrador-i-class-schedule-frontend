import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '../services/api'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  mutations: {
    UPDATE_LOGIN (state, { auth, token, user }) {
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('user', JSON.stringify({ ...user, auth }))
    }
  },
})
