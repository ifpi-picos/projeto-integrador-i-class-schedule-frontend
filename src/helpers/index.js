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
			Response = await api.verifyToken({
				email: user.email,
				name: user.name,
				token
			})
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
