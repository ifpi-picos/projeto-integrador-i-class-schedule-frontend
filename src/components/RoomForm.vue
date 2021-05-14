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
              v-model.trim="registry.name"
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
        :disabled="!checkFormValidity() || buttonDisable"
        variant="success"
        @click="handleSubmit()"
      >
<<<<<<< HEAD
=======
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow" style="animation-delay: 0.2s"></b-spinner>
        <b-spinner small type="grow" style="animation-delay: 0.4s"></b-spinner>

        <!--<span
          v-if="buttonDisable"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span> -->
>>>>>>> 7b0505735b87bb58aba660b11dcefe442baff9f9
        <span v-if="buttonDisable">
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="sr-only"></span>
          </div>
        </span>

        <span v-else>
          Salvar
        </span>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import modalForm from '../mixins/modalForm'

export default {
  name: 'RoomForm',
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
      this.handleOk('rooms')
    }
  }
}
</script>

<style scoped></style>
