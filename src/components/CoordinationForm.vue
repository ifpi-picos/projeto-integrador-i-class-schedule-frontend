<template>
  <b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro das coordenações</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="11">
            <base-input
              type="text"
              label="Nome da coordenação"
              placeholder="Nome da coordenação"
              name="Nome da coordenação"
              v-model="registry.username"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="11">
            <base-input
              type="text"
              label="Nome do responsável"
              placeholder="Nome do responsável"
              name="Nome do responsável"
              v-model="coordination.responsible"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="11">
            <base-input
              type="email"
              label="email do responsável"
              placeholder="coordenacao.edu@gmail.com"
              name="email"
              v-model="coordination.email"
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
  name: 'CoordinationForm',
  data () {
    return {
      coordination: {
        username: '',
        responsible: '',
        email: ''
      }
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    IdCoordination: {
      type: String,
      default: '',
      description: 'id da coordenação que vai ser atualizada'
    },
    title: {
      type: String,
      description: 'titulo do modal'
    }
  },
  methods: {

    handleSubmit () {
      this.handleSubmit('coordinations')
    },
  
  },

}
</script>

<style lang=""></style>
