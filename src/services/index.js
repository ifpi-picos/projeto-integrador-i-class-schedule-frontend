import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api/'
})

const api = {
  get (url) {
    return axios.get(url)
  },
  post (url, body) {
    return axios.post(url, body)
  },
  put (url, body) {
    return axios.put(url, body)
  },
  delete (url) {
    return axios.delete(url)
  }
}

export { api }
