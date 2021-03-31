import { api } from '../services/index'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      dataBase: null
    }
  },
  computed: {
    ...mapState(['data_base'])
  },
  methods: {
    ...mapActions(['getDatabase']),
    async get (url) {
      const Response = await api.get(url)
      const { data } = Response
      this.dataBase = data.data
    },
    delete (url) {}
  }
}
