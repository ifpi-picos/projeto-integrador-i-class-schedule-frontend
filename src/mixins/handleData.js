import { eventBus } from '../main'

export default {
  data () {
    return {
      dataBase: null,
      produtosPorPagina: 50,
      produtosTotal: 0,
      loading: true
    }
  },

  methods: {
    async get (url, params = null) {
      this.loading = true
      try {
        const { data } = await this.$axios.get(url, params)
        this.dataBase = data
        this.loading = false
      } catch ({message}) {
        console.log(message)
      }
    },
    delete (url, id) {
      this.$bvModal
        .msgBoxConfirm('Tem certeza que deseja deletar?', {
          title: 'Confirmação',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          cancelVariant: 'primary',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
          okTitle: 'Sim',
          cancelTitle: 'Não'
        })
        .then(value => {
          if (value) {
            this.$axios.delete(`${url}/${id}`).then(() => {
              const roomIndex = this.dataBase.findIndex(data => {
                return data.id === id
              })
              window.toast.fire({
                icon: 'success',
                title: 'Deletado com sucesso'
              })
              this.dataBase.splice(roomIndex, 1)
            })
          }
        })
    }
  },

  created () {
    eventBus.$on('update', (payload, changeType) => {
      if (changeType === 'added') {
        const arrayLength = this.dataBase.length
        this.$set(this.dataBase, arrayLength, payload)
      }

      if (changeType === 'modified') {
        this.dataBase.forEach((item, index) => {
          if (payload.id === item.id) {
            this.$set(this.dataBase, index, payload)
          }
        })
      }
    })
  }
}
