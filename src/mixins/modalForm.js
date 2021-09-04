import { eventBus } from '../main'

export default {
  data () {
    return {
      registry: {},
      buttonDisable: false
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
          const { data } = await this.$axios.put(
            `/${url}/${registry.id}`,
            registry
          )

          console.log('modified')

          eventBus.$emit('update', data.data, 'modified')

          this.$refs[this.idModal].hide()
          this.$prettyAlerts.success(data.message)
        } catch ({ response: { data } }) {
          this.$prettyAlerts.error(data.error.message)
        }
      } else {
        try {
          // adicionar um novo registro
          this.buttonDisable = true

          const { data } = await this.$axios.post(`/${url}`, registry)
          this.buttonDisable = false

          eventBus.$emit('update', data.data, 'added')

          this.$refs[this.idModal].hide()

          this.$prettyAlerts.success(data.message)
        } catch ({ response: { data } }) {
          this.buttonDisable = false
          this.$prettyAlerts.error(data.error.message)
        }
      }
    }
  },

  watch: {
    registry () {
      this.checkFormValidity()
    }
  }
}
