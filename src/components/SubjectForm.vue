<template>
  <b-modal size="sm" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de disciplinas</h6>

      <div class="lg-4">
        <b-row>
          <b-col lg="12">
            <base-input
              type="text"
              label="Nome"
              placeholder="Nome"
              name="Nome"
              v-model="subject.name"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="12">
            <base-input
              type="number"
              min="1"
              max="200"
              label="Carga Horária"
              placeholder="Ex.: SIAPE "
              v-model="subject.workload"
              name="Carga Horária"
              required
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
    <template #modal-footer="{ hide }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
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
export default {
  name: 'SubjectForm',
  data () {
    return {
      subject: {
        name: '',
        workload: ''
      }
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    subjectId: {
      type: String,
      default: '',
      description: 'id da disciplina que vai ser atualizada'
    },
    title: {
      type: String,
      description: 'titulo do modal'
    }
  },
}
</script>

<style></style>
