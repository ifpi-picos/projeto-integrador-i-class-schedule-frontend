import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	state: {
		areas: []
	},

	mutations: {
		setAreas(state, areas) {
			state.areas = areas
		}
	},

	getters: {
		getAreas(state) {
			return state.areas
		}
	},

	actions: {
		async requestAreas({ commit }) {
			try {
				console.log(this)
				const { data } = await api.get('/areas')

				commit('setAreas', data)
			} catch ({ message }) {
				window.toast.fire({
					icon: 'error',
					title: message
				})
			}
		}
	}
})
