import Axios from 'axios'

// const API_URL = process.env.API_URL || 'http://localhost:3000/api/'
const API_URL = 'https://empty-coffee-cups.herokuapp.com/api/'

const axiosInstance = Axios.create({
  baseURL: API_URL
})

axiosInstance.interceptors.request.use(
  config => {
    const { token } = window.localStorage

    if (token && config.url !== 'auth/login') {
      config.headers.Authorization = token
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

import store from '../store'
import router from '../routes/router'

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  err => {
    const {
      config,
      response: { status, data }
    } = err
    console.log(err)
    if (status === 401) {
      store.commit('UPDATE_LOGIN', {
        auth: false,
        token: null,
        user: { name: null, email: null }
      })
      router.push({ name: 'login' })
      return Promise.reject(err)
    }
  }
)

const api = {
  get (url, params) {
    return axiosInstance.get(url, params)
  },
  post (url, body) {
    return axiosInstance.post(url, body)
  },
  put (url, body) {
    return axiosInstance.put(url, body)
  },
  delete (url) {
    return axiosInstance.delete(url)
  },
  login (body) {
    return axiosInstance.post('auth/login', body)
  },
  verifyToken (credentials) {
    return axiosInstance.post('auth/refresh-token', credentials)
  }
}

export { api }
