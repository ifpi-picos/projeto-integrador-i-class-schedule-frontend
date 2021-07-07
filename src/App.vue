<template>
  <router-view></router-view>
</template>

<script>
import { api } from './services/api'

export default {
  name: "APP",
  created() {},
  methods: {
    verifyToken: async () => {
      const token = window.localStorage.getItem('token')
      const user = JSON.parse(window.localStorage.getItem('user'))
      let Response = ''
      if (user) {
        const { data } = await api.verifyToken({
          email: user.email,
          name: user.name,
          token
        })
        Response = data
      }
      // if (token && Response.auth) {
      //   store.commit('UPDATE_LOGIN', Response)
      //   router.push({ name: 'dashboard' })
      // }
      store.commit('UPDATE_LOGIN', Response)
    },
  },
};
</script>
