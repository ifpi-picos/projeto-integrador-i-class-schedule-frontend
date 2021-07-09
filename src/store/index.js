import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '../services/api'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    auth: false,
    user: {
      name: '',
      email: ''
    }
  },
  getters: {
    getAuth (state) {
      return state.auth
    }
  },
  mutations: {
    UPDATE_LOGIN (state, { auth, token, user }) {
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('user', JSON.stringify({ ...user, auth }))
      state.auth = auth
      state.user = user
    }
  },
  actions: {
    login (context, { email, password }) {
      return api.login({
        email,
        password
      })
    }
  },
  modules: {}
})
