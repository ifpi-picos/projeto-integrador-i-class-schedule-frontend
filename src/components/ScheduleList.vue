<template>
  <div>
    <spinner :showLoad="true" v-if="loader" />
    
    <div v-if="!loader">
      <table class="table">
        <thead class="table-active">
          <tr>
            <th scope="col">Turno</th>
            <th scope="col">Horario</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="schedule in schedules" :key=schedule.id>
            <td>{{schedule.turno}}</td>
            <td>{{schedule.horario}} - {{schedule.horario}}</td>
            <td>
               <b-button
              @click="editschedule(schedule.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delschedule(schedule.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
            </td>
          </tr>
        </tbody>

      </table>
      <!-- <b-table borderless hover :responsive="true" :items="schedules" :fields="fields">
        <template v-slot:cell(actions)="data">
          <div class="d-flex align-items-center"  >
            <b-button
              @click="editschedule(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delschedule(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table> -->
    </div>
    <schedule-form idModal="modalEdit" title="Editar Turno" :scheduleId="scheduleId"/>

  </div>
</template>

<script>
import ScheduleForm from "../components/ScheduleForm"
export default {
  components: {
    ScheduleForm
  },
  name: 'ScheduleList',
  data () {
    return {
      scheduleId: '',
      schedules: [],
      // fields: [
      //   {
      //     key: 'turno',
      //     label: 'Turno',
      //     sortable: true
      //   },
      //   {
      //     key: 'horario',
      //     label: 'Horário',
      //     sortable: true
      //   },
      //   {
      //     key: 'actions',
      //     label: 'Ações'
      //   }
      // ],
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
    editschedule (id, button) {
      this.scheduleId = id
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delschedule (id) {
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

