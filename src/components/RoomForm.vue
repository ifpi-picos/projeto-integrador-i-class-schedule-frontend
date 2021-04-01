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
        @click="handleOk()"
      >
        Salvar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { api } from '../services/index'
import { mapState, mapActions } from 'vuex'
import { eventBus } from '../main'

export default {
  name: 'RoomForm',
  data () {
    return {
      room: {
        name: ''
      }
    }
  },

  created () {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      console.log('Modal is about to be shown', bvEvent, modalId)
      this.room = this.roomProp
    })
  },

  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    roomProp: {
      type: Object,
      default: function () {
        return {}
      },
      description: 'sala que vai ser atualizado'
    },
    title: {
      type: String,
      description: 'titulo do modal'
    }
  },

  computed: {
    fillForm () {
      return (this.room = this.roomProp)
    }
  },

  methods: {
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      return valid
    },

    async handleOk (bvModalEvt) {
      // Trigger submit handler
      await this.handleSubmit()
      this.$refs[this.idModal].hide()
    },

    handleSubmit () {
      const payload = {
        name: this.room.name
      }

      if (!this.checkFormValidity()) {
        return
      }

      const room = this.roomProp

      if (room.id) {
        api.put(`/rooms/${room.id}`, payload).then(response => {
          eventBus.$emit('update', response.data.data, 'modified')
        })
      } else {
        console.log('idroom nao existe')
        api
          .post('/rooms', payload)
          .then(response => {
            eventBus.$emit('update', response.data.data, 'added')
          })
          .catch()
      }
    }
  },

  watch: {
    // roomProp () {
    //   this.fillForm()
    // },
    room () {
      this.checkFormValidity()
    }
  }
}
</script>

<style></style>
