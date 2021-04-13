<template>
  <div>
    <div class="d-flex justify-content-center mt-3 mb-3" v-if="loading">
      <b-spinner
        style="width: 3rem; height: 3rem"
        variant="success"
        label="Spinning"
      ></b-spinner>
    </div>

    <div v-else>
      <b-table
        table-class="border-bottom"
        head-variant="light"
        hover
        :responsive="true"
        :items="schedules"
        :fields="fields"
        sort-by="turno"
        sort-icon-left
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
      ]
    }
  },
  created () {
    this.getSchedule()
  },
  methods: {}
}
</script>
