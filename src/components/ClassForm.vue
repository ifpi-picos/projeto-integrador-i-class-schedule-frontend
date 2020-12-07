<template>
  <b-modal
    @ok="handleOk"
    size="lg"
    centered
    :id="idModal"
    :ref="idModal"
    title="Nova turma"
  >
    <b-form ref="form" @submit.stop.prevent="Submit()">
      <h6 class="heading-small text-muted mb-4">Cadastro das turmas</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="7">
            <base-input
              type="text"
              label="Nome da turma"
              placeholder="INFO III"
              v-model="schoolClass.name"
              error="teste"
              rules="required"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="4">
            <base-input label="Turno" required>
              <select v-model="schoolClass.shift" class="form-control">
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Noite</option>
              </select>
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Curso"
              placeholder="Informática"
              v-model="schoolClass.course"
              name="Curso"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="5">
            <base-input
              type="number"
              label="Módulo"
              placeholder="3"
              v-model="schoolClass.module"
              name="modulo"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input label="Sala" required>
              <select v-model="schoolClass.location" class="form-control">
                <option>Local 1</option>
                <option>Local 2</option>
                <option>Local 3</option>
                <option>Local 4</option>
              </select>
            </base-input>
          </b-col>

          <b-col lg="5">
            <base-input label="Horário" required>
              <select v-model="schoolClass.houer" class="form-control">
                <option>7:00 - 17:30</option>
                <option>13:00 - 18:00</option>
                <option>18:00 - 22:00</option>
              </select>
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
  name: 'ClassForm',
  data () {
    return {
      schoolClass: {
        name: '',
        shift: '',
        course: '',
        module: '',
        location: '',
        houer: ''
      }
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    idClass: {
      type: String,
      default: '',
      description: 'id da turma que vai ser atualizado'
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      return valid
    },
    handleOk (bvModalEvt) {
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      const payload = {
        nome: this.schoolClass.name,
        turno: this.schoolClass.shift,
        curso: this.schoolClass.course,
        modulo: this.schoolClass.module,
        local: this.schoolClass.location,
        horario: this.schoolClass.houer,
        createdAt: new Date().getTime()
      }
      if (!this.checkFormValidity()) {
        return
      }

      const BD = this.$firebase.firestore().collection('turmas')

      if (this.idClass) {
        BD.doc(this.idClass)
          .set(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.idClass) {
              this.schoolClass = {}
            }
          })
          .catch(error => console.error(error))
      } else {
        BD.add(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.idClass) {
              this.schoolClass = {}
            }
          })
          .catch(error => console.error(error))
      }
    },
    fillForm () {
      console.log(this.idClass)
      if (this.idClass) {
        this.$firebase
          .firestore()
          .collection('turmas')
          .doc(this.idClass)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.data()
            console.log(data)
            this.schoolClass.name = data.nome
            this.schoolClass.shift = data.turno
            this.schoolClass.course = data.curso
            this.schoolClass.module = data.modulo
            this.schoolClass.location = data.local
            this.schoolClass.houer = data.horario
          })
          .catch(error => {
            console.log('Error getting documents: ', error)
          })
      }
    }
  },
  watch: {
    idClass () {
      this.fillForm()
    },
    schoolClass () {
      this.checkFormValidity()
    }
  }
}
</script>

<style></style>
