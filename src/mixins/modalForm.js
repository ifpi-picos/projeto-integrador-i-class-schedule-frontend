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

    async handleOk (url) {
      if (!this.checkFormValidity()) {
        return
      }
      const registry = this.registry
      if (registry.id) {
        api
          .put(`/${url}/${registry.id}`, registry)
          .then(response => {
            console.log('modified')
            eventBus.$emit('update', response.data.data, 'modified')
            this.$refs[this.idModal].hide()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        try {
          const { data } = await api.post(`/${url}`, registry)

          eventBus.$emit('update', data.data, 'added')
          this.$refs[this.idModal].hide()
        } catch (err) {
          console.log(err)
        }
        // api.post(`/${url}`, registry).then(
        //   response => {
        //     eventBus.$emit('update', response.data.data, 'added')
        //     this.$refs[this.idModal].hide()
        //   },
        //   err => {
        //     console.log(err)
        //   }
        // )
      }
    }
  },
  created () {},
  watch: {
    registry () {
      this.checkFormValidity()
    }
  }
}
