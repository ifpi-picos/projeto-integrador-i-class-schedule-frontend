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
            // this.$swal('Sucesso', response.data.message, 'success')

            this.$refs[this.idModal].hide()

            window.toast.fire({
              icon: 'success',
              title: response.data.message
            })
          })
          .catch(error => {
            const data = error.response
            // this.$swal('Erro', data.data.error.message, 'error')
            window.toast.fire({
              icon: 'error',
              title: data.data.error.message
            })
          })
      } else {
        try {
          const { data } = await api.post(`/${url}`, registry)

          eventBus.$emit('update', data.data, 'added')

          this.$refs[this.idModal].hide()

          // this.$swal('Sucesso', data.message, 'success')
          window.toast.fire({
            icon: 'success',
            title: data.message
          })
        } catch (error) {
          const data = error.response
          // this.$swal('Erro', data.data.error.message, 'error')
          window.toast.fire({
            icon: 'error',
            title: data.data.error.message
          })
        }
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
