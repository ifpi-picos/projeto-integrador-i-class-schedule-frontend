import { api } from '../services/api'

const credentials = ({ auth, token, user }) => {
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify({ ...user, auth }))
}

const autenticate = async () => {
  const token = window.localStorage.getItem('token')
  const user = JSON.parse(window.localStorage.getItem('user'))

  let Response = ''

  if (user) {
    try {
      const { data } = await api.verifyToken({
        email: user.email,
        name: user.name,
        token
      })
      Response = data
    } catch (e) {
      console.log(e)
      Response = e
    }
  }

  // if (token && Response.auth) {
  //   store.commit('updateCredentials', Response)
  //   router.push({ name: 'dashboard' })
  // }
  credentials(Response)
}

export { autenticate, credentials }
