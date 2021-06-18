import Axios from 'axios'

const axiosInstance = Axios.create({
  // baseURL: 'http://localhost:3000/api/'
  baseURL: 'https://empty-coffee-cups.herokuapp.com/api/'
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

const api = {
  get (url) {
    return axiosInstance.get(url)
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
  }
}

export { api }
