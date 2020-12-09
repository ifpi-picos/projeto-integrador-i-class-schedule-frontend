<template>
  <b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro das coordenações</h6>
      <div class="pl-lg-4">
        <b-row>
          <b-col lg="10">
            <base-input
              type="text"
              label="Nome da coordenação"
              placeholder="Nome da coordenação"
              name="nome"
              v-model="coordination.username"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="10">
            <base-input
              type="text"
              label="Nome do responsável"
              placeholder="Nome do responsável"
              name="responsible"
              v-model="coordination.responsible"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="10">
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
      <b-button variant="secondary" @click="hide('forget')">
        Cancelar
      </b-button>
      <b-button
        :disabled="!checkFormValidity()"
        variant="primary"
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
      description: 'referencia d modal'
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
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      console.log('ta validando')
      return valid
    },
    handleOk () {
      this.handleSubmit()
    },
    handleSubmit () {
      const payload = {
        nome: this.coordination.username,
        responsavel: this.coordination.responsible,
        email: this.coordination.email,
        createdAt: new Date().getTime()
      }
      if (!this.checkFormValidity()) {
        return
      }
      const bd = this.$firebase.firestore().collection('coordenacoes')

      if (this.IdCoordination) {
        bd.doc(this.IdCoordination)
          .set(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.IdCoordination) {
              this.coordination = {}
            }
          })
          .catch(error => console.error(error))
      } else {
        bd.add(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.IdCoordination) {
              this.coordination = {}
            }
          })
          .catch(error => console.error(error))
      }
    }
  }
}
</script>

<style lang=""></style>
