<template>
  <div>
    <spinner :showLoad="true" v-if="loader" />

    <div v-if="!loader">
      <b-table
        table-class="border-bottom"
        head-variant="light"
        hover
        :responsive="true"
        :items="schedules"
        :fields="fields"
      >
        <template #cell(horario)="data">
          <div class="d-flex justify-content-center ">
            {{ data.item.inicio_horario }} - {{ data.item.fim_horario }}
          </div>
        </template>

        <template v-slot:cell(actions)="data">
          <div class="d-flex justify-content-center ">
            <b-button
              @click="editSchedule(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delSchedule(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <schedule-form
      idModal="modalEdit"
      title="Editar Turno"
      :scheduleId="scheduleId"
    />
  </div>
</template>

<script>
import ScheduleForm from '../components/ScheduleForm'
export default {
  components: {
    ScheduleForm
  },
  name: 'ScheduleList',
  data () {
    return {
      scheduleId: '',
      schedules: [],
      fields: [
        {
          key: 'turno',
          label: 'Turno',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'horario',
          label: 'Horário',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true,
          thClass: 'text-center'
        },
        {
          key: 'actions',
          label: 'Ações',
          thClass: 'text-center'
        }
      ],
      loader: true
    }
  },
  created () {
    this.getSchedule()
  },
  methods: {
    async getSchedule () {
      this.$firebase
        .firestore()
        .collection('turnos')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            this.loader = false
            if (change.type === 'added') {
              const schedule = change.doc.data()
              schedule.id = change.doc.id
              this.schedules.push(schedule)
            }
            if (change.type === 'modified') {
              console.log('Modified: ', change.doc.data())
              this.schedules.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  const scheduleUpdate = change.doc.data()
                  scheduleUpdate.id = change.doc.id
                  this.$set(this.schedules, index, scheduleUpdate)
                }
              })
            }
            if (change.type === 'removed') {
              console.log('Removed : ', change.doc.data())
              this.schedules.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  this.schedules.splice(index, 1)
                }
              })
            }
          })
        })
    },
    editSchedule (id, button) {
      this.scheduleId = id
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delSchedule (id) {
      this.$bvModal
        .msgBoxConfirm('Tem certeza que deseja deletar?', {
          title: 'Confirmação',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          cancelVariant: 'primary',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
          okTitle: 'Sim',
          cancelTitle: 'Não'
        })
        .then(value => {
          if (value) {
            this.$firebase
              .firestore()
              .collection('turnos')
              .doc(id)
              .delete()
              .then(() => {
                console.log('apagado')
              })
              .catch(erro => {
                console.error(error)
              })
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
