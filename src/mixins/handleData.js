import { api } from '../services/index'
import { eventBus } from '../main'

export default {
  data () {
    return {
      dataBase: null,
      loading: true
    }
  },
  methods: {
    async get (url) {
      this.loading = true
      const Response = await api.get(url)
      const { data } = Response
      this.dataBase = data.data
      setTimeout(() => {
        this.loading = false
      }, 1000)
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
            api.delete(`${url}/${id}`).then(() => {
              const roomIndex = this.dataBase.rows.findIndex(
                data => data.id === id
              )
              this.dataBase.rows.splice(roomIndex, 1)
            })
          }
        })
    }
  },
  created () {
    eventBus.$on('update', (payload, changeType) => {
      if (changeType === 'added') {
        const arrayLength = this.dataBase.rows.length
        this.$set(this.dataBase.rows, arrayLength, payload)
      }

      if (changeType === 'modified') {
        this.dataBase.rows.forEach((item, index) => {
          if (payload.id === item.id) {
            this.$set(this.dataBase.rows, index, payload)
          }
        })
      }
    })
  }
}
