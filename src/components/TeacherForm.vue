<template>
  <b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de professores</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome"
              placeholder="Nome"
              name="Nome"
              v-model="teacher.username"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="text"
              label="Matrícula"
              placeholder="Ex.: SIAPE "
              v-model="teacher.registration"
              name="Matricula"
              required
              rules="required|min:7|max:7"
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="email"
              label="E-mail"
              placeholder="professor@email.com"
              v-model="teacher.email"
              required
              name="email"
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input label="Área de atuação" required>
              <b-form-select
                class="form-control"
                required
                v-model="teacher.occupationArea"
                :options="occupationAreas"
              ></b-form-select>
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input label="Coordenação" required>
              <b-form-select
                class="form-control"
                required
                v-model="teacher.coordination"
                :options="coordinations"
              ></b-form-select>
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
  name: 'TeacherForm',
  data () {
    return {
      teacher: {
        username: '',
        registration: '',
        email: '',
        occupationArea: null,
        coordination: null
      },
      coordinations: [
        { value: null, text: 'Por favor selecione uma opção' },
        { value: 'id-cordenação', text: 'ADS' },
        { value: 'id-cordenação', text: 'ADM' },
        { value: 'id-cordenação', text: 'FIS' }
      ],
      occupationAreas: [
        { value: null, text: 'Por favor selecione uma opção' },
        { value: 'informática', text: 'Infórmatica' },
        { value: 'fisica', text: 'Fisica' },
        { value: 'quimica', text: 'Quimica' }
      ]
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    idTeacher: {
      type: String,
      default: '',
      description: 'id do professor que vai ser atualizado'
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
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      const payload = {
        nome: this.teacher.username,
        matricula: this.teacher.registration,
        email: this.teacher.email,
        area_de_ocupacao: this.teacher.occupationArea,
        coordenacao: this.teacher.coordination,
        createdAt: new Date().getTime()
      }
      if (!this.checkFormValidity()) {
        return
      }
      const DB = this.$firebase.firestore().collection('professores')

      if (this.idTeacher) {
        DB.doc(this.idTeacher)
          .set(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.idTeacher) {
              this.teacher = {}
            }
          })
          .catch(error => console.error(error))
      } else {
        DB.add(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.idTeacher) {
              this.teacher = {}
            }
          })
          .catch(error => console.error(error))
      }
    },
    fillForm () {
      if (this.idTeacher) {
        this.$firebase
          .firestore()
          .collection('professores')
          .doc(this.idTeacher)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.data()
            this.teacher.username = data.nome
            this.teacher.registration = data.matricula
            this.teacher.email = data.email
            this.teacher.occupationArea = data.area_de_ocupacao
            this.teacher.coordination = data.coordenacao
          })
          .catch(error => {
            console.log('Error getting documents: ', error)
          })
      }
    }
  },
  watch: {
    idTeacher () {
      this.fillForm()
    },
    teacher () {
      this.checkFormValidity()
    }
  }
}
</script>

<style></style>
