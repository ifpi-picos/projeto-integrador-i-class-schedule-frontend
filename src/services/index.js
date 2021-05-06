import Axios from 'axios'

const axiosInstance = Axios.create({
  // baseURL: 'http://localhost:3000/api/'
  baseURL: 'https://empty-coffee-cups.herokuapp.com/api/'
})

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
  }
}

export { api }
