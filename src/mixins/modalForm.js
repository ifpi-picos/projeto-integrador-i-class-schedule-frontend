import { api } from '../services/index'
import { eventBus } from '../main'

export default {
  data () {
    return {
      registry: {}
    }
  },
  mounted () {
    this.$root.$on('bv::show::modal', (modalId, registry) => {
      if (modalId === 'modalEdit') {
        this.registry = Object.assign({}, registry)
      } else if (modalId === 'modalAdd') {
        this.registry = {}
      }
    })
  },
  props: {},
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      return valid
    },

    handleOk (url) {
      if (!this.checkFormValidity()) {
        return
      }
      const registry = this.registry
      if (registry.id) {
        api.put(`/${url}/${registry.id}`, registry).then(response => {
          console.log('modified')
          eventBus.$emit('update', response.data.data, 'modified')
        })
      } else {
        api
          .post(`/${url}`, registry)
          .then(response => {
            eventBus.$emit('update', response.data.data, 'added')
          })
          .catch()
      }
      this.$refs[this.idModal].hide()
    }
  },
  created () {},
  watch: {
    registry () {
      this.checkFormValidity()
    }
  }
}
