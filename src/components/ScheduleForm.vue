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
              v-model="schedule.shift"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="12">
            <base-input
              type="time"
              min="06:00"
              max="22:00"
              label="Inicio"
              placeholder="Select time"
              
              v-model="schedule.StartTime"
              required
            >
            </base-input>

            <base-input
              type="time"
              min="06:00"
              max="22:00"
              label="Fim"
              placeholder="Select time"
              v-model="schedule.endTime"
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
  name: 'ScheduleForm',
  data () {
    return {
      schedule: {
        shift: '',
        // time: {
        //   startTime: '',
        //   endTime: '',
        // },,
        StartTime: null,
        endTime: null
      }
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    scheduleId: {
      type: String,
      default: '',
      description: 'id do turno que vai ser atualizada'
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
        turno: this.schedule.shift,
        inicio_horario: this.schedule.StartTime,
        fim_horario: this.schedule.endTime,
        createdAt: new Date().getTime()
      }
      if (!this.checkFormValidity()) {
        return
      }
      const BD = this.$firebase.firestore().collection('turnos')

      if (this.scheduleId) {
        BD.doc(this.scheduleId)
          .set(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.scheduleId) {
              this.schedule = {}
            }
          })
          .catch(error => console.error(error))
      } else {
        BD.add(payload)
          .then(() => {
            this.$refs[this.idModal].hide()
            if (!this.scheduleId) {
              this.schedule = {}
            }
          })
          .catch(error => console.error(error))
      }
    },
    fillForm () {
      if (this.scheduleId) {
        this.$firebase
          .firestore()
          .collection('turnos')
          .doc(this.scheduleId)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.data()
            this.schedule.shift = data.turno
            this.schedule.StartTime = data.inicio_horario
            this.schedule.endTime = data.fim_horario
            // this.schedule.time = data.horario
          })
          .catch(error => {
            console.log('Error getting documents: ', error)
          })
      }
    }
  },
  watch: {
    scheduleId () {
      this.fillForm()
    },
    schedule () {
      this.checkFormValidity()
    }
  }
}
</script>
