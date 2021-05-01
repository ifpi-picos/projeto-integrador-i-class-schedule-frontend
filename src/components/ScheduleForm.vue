<template>
  <b-modal size="sm" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de Turnos</h6>
      <div class="lg-4">
        <b-row>
          <b-col lg="12">
            <base-input
              type="text"
              label="Turno"
              placeholder="Ex: Noturno"
              name="Turno"
              v-model="registry.name"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="12">
            <base-input
              name="Inicio"
              type="time"
              min="06:00"
              max="22:00"
              label="Inicio"
              placeholder="Select time"
              v-model="registry.start"
              required
            >
            </base-input>

            <base-input
              name="Fim"
              type="time"
              min="06:00"
              max="22:00"
              label="Fim"
              placeholder="Select time"
              v-model="registry.end"
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
import modalForm from '../mixins/modalForm'

export default {
  name: 'ScheduleForm',
  mixins: [modalForm],
  data () {
    return {}
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
    handleSubmit () {
      this.handleOk('shifts')
    }
  }
}
</script>
