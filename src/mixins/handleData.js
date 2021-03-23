import { api } from '../services/index'

export default {
  data () {
    return {
      dataBase: null
    }
  },
  methods: {
    async get (url) {
      const Response = await api.get(url)
      this.dataBase = Response.data.data
    }
  }
}
