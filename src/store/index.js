import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '@/services'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    data_base: null
  },
  mutations: {
    UPDATE_DATABASE (state, payload) {
      state.data_base = payload
    },
    // ADD_DATABASE (state, payload) {
    //   state.data_base.unshit(payload)
    // },
    ADD_DATABASE (state, payload) {
      state.data_base.name = payload
      // state.data_base.push(payload)
    }
  },
  actions: {
    getDatabase (context) {
      api.get('/rooms').then(response => {
        console.log(response)
        context.commit('UPDATE_DATABASE', response.data.data)
      })
    }
  },
  modules: {}
})
