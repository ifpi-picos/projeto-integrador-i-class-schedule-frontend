import { eventBus } from '../main'
import { serialize } from '@/helpers.js'

export default {
  data () {
    return {
      dataBase: null,
      produtosPorPagina: 50,
      produtosTotal: 0,
      loading: true,
      urlapontada: ''
    }
  },
  computed: {
    urlFormated () {
      const query = serialize(this.$route.query)
      return `search?${query}`
    }
  },
  methods: {
    // Listagem de registros
    // async get (url) {
    //   this.urlapontada = url
    //   this.loading = true
    //   try {
    //     if (this.urlFormated !== 'search?') {
    //       url = `${url}/${this.urlFormated}`
    //     }
    //     console.log(url)
    //     const { data } = await this.$axios.get(`${url}`)
    //     this.dataBase = data.data
    //     this.loading = false
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    async get (url, params = null) {
      this.loading = true
      try {
        const { data } = await this.$axios.get(url, params)
        this.dataBase = data.data
        this.loading = false
        console.log('GET com params')
      } catch (err) {
        console.log(err)
      }
    },

    // Apagar um registro do BD
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
                console.log(data)
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
  watch: {
    urlFormated () {
      this.get(this.urlapontada)
    }
  },

  created () {
    eventBus.$on('update', (payload, changeType) => {
      if (changeType === 'added') {
        const arrayLength = this.dataBase.length
        console.log(payload)
        console.log('add')

        this.$set(this.dataBase, arrayLength, payload)
      }

      if (changeType === 'modified') {
        this.dataBase.forEach((item, index) => {
          if (payload.id === item.id) {
            this.$set(this.dataBase, index, payload)
            console.log('modificado')
          }
        })
      }
    })
  }
}
