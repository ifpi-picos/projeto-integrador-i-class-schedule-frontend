import { api } from '../services/index'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      dataBase: this.data_base
    }
  },
  computed: {
    ...mapState(['data_base'])
  },
  methods: {
    ...mapActions(['getDatabase']),
    async get (url) {
      this.dataBase = null
      const Response = await api.get(url)
      this.dataBase = Response.data.data
    },
    delete (url) {}
  },
  watch: {
    data_base () {}
  }
}
