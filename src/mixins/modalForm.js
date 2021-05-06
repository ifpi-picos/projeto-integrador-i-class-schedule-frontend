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
    // Validar formulário
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      return valid
    },

    async handleOk (url) {
      if (!this.checkFormValidity()) {
        return
      }
      const registry = this.registry

      // Verificar si foi pego um registro para editar
      if (registry.id) {
        try {
          const { data } = await api.put(`/${url}/${registry.id}`, registry)

          console.log('modified')

          eventBus.$emit('update', data.data, 'modified')

          this.$refs[this.idModal].hide()

          window.toast.fire({
            icon: 'success',
            title: data.message
          })
        } catch (error) {
          const data = error.response

          window.toast.fire({
            icon: 'error',
            title: data.data.error.message
          })
        }
      } else {
        try {
          // adicionar um novo registro
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
