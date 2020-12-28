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
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      return valid
    },
    handleOk () {
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      const payload = {
        nome: this.subject.name,
        carga_horaria: this.subject.workload,
        createdAt: new Date().getTime()
      }
      if (!this.checkFormValidity()) {
        return
      }
      const BD = this.$firebase.firestore().collection('disciplinas')

      if (this.subjectId) {
        BD.doc(this.subjectId)
          .set(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.subjectId) {
              this.subject = {}
            }
          })
          .catch(error => console.error(error))
      } else {
        BD.add(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.subjectId) {
              this.subject = {}
            }
          })
          .catch(error => console.error(error))
      }
    },
    fillForm () {
      if (this.subjectId) {
        this.$firebase
          .firestore()
          .collection('disciplinas')
          .doc(this.subjectId)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.data()
            this.subject.name = data.nome
            this.subject.workload = data.carga_horaria
          })
          .catch(error => {
            console.log('Error getting documents: ', error)
          })
      }
    }
  },
  watch: {
    subjectId () {
      this.fillForm()
    },
    subject () {
      this.checkFormValidity()
    }
  }
}
</script>

<style></style>
