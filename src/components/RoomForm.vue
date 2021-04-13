<template>
  <b-modal size="sm" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de Sala de aulas</h6>

      <div>
        <b-row>
          <b-col lg="12">
            <base-input
              type="text"
              name="Sala"
              label="Sala"
              placeholder="Sala"
              v-model="room.name"
              required
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
    <template #modal-footer="{ hide }">
      <b-button variant="outline-danger" @click="hide('forget')">
        Cancelar
      </b-button>
      <b-button
        :disabled="!checkFormValidity()"
        variant="success"
        @click="handleSubmit()"
      >
        Salvar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { api } from '../services/index'
import { eventBus } from '../main'

export default {
  name: 'RoomForm',
  data () {
    return {
      room: {}
    }
  },

  mounted () {
    this.$root.$on('bv::show::modal', (modalId, room) => {
      if (modalId === 'modalEdit') {
        this.room = Object.assign({}, room)
      } else if (modalId === 'addRoom') {
        this.room = {}
      }
    })
  },

  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    title: {
      type: String,
      description: 'titulo do modal'
    }
  },

  methods: {
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      return valid
    },

    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      const room = this.room
      if (room.id) {
        api.put(`/rooms/${room.id}`, room).then(response => {
          console.log('modified')
          eventBus.$emit('update', response.data.data, 'modified')
        })
      } else {
        api
          .post('/rooms', room)
          .then(response => {
            eventBus.$emit('update', response.data.data, 'added')
          })
          .catch()
      }
      this.$refs[this.idModal].hide()
    }
  },

  watch: {
    room () {
      this.checkFormValidity()
    }
  }
}
</script>

<style></style>
