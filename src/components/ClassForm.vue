<template>
  <b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro das turmas</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="7">
            <base-input
              type="text"
              label="Nome da turma"
              placeholder="INFO III"
              v-model="schoolClass.name"
              name="Nome da turma"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="4">
            <base-input label="Turno" required>
              <b-form-select
                class="form-control"
                required
                v-model="schoolClass.shift"
                :options="schedules"
              ></b-form-select>
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input label="Curso" name="Curso" required>
              <b-form-select
                class="form-control"
                required
                v-model="schoolClass.course"
                :options="courses"
              ></b-form-select>
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
              <b-form-select
                class="form-control"
                required
                v-model="schoolClass.location"
                :options="locations"
              ></b-form-select>
            </base-input>
          </b-col>

          <!--  <b-col lg="5">
            <base-input label="Horário" required>
              <select v-model="schoolClass.houer" class="form-control">
                <option>7:00 - 17:30</option>
                <option>13:00 - 18:00</option>
                <option>18:00 - 22:00</option>
              </select>
            </base-input>
          </b-col>
        -->
        </b-row>
      </div>
    </b-form>

    <template #modal-footer="{ hide }">
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
        name: null,
        shift: null,
        course: null,
        module: null,
        location: null
        //houer: null
      },
      schedules: [
        { value: null, text: 'Por favor escolha uma opção' },
        { value: 'id-manha', text: 'Manha' },
        { value: 'id-tarde', text: 'Tarde' },
        { value: 'id-noite', text: 'Noite' }
      ],
      locations: [
        { value: null, text: 'Por favor escolha uma opção' },
        { value: 'id-a1', text: 'A1' },
        { value: 'id-a2', text: 'A2' },
        { value: 'id-a3', text: 'A3' }
      ],
      courses: [
        { value: null, text: 'Por favor escolha uma opção' },
        { value: 'id-ads', text: 'ADS' },
        { value: 'id-adm', text: 'ADM' },
        { value: 'id-fis', text: 'FIS' }
      ]
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
      this.handleSubmit()
    },
    handleSubmit () {
      const payload = {
        nome: this.schoolClass.name,
        turno: this.schoolClass.shift,
        curso: this.schoolClass.course,
        modulo: this.schoolClass.module,
        local: this.schoolClass.location,
        //  horario: this.schoolClass.houer,
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
        console.log(this.idClass)
        this.$firebase
          .firestore()
          .collection('turmas')
          .add(payload)
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
