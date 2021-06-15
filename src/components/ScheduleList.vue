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
        :items="dataBase"
        :fields="fields"
        sort-by="turno"
        sort-icon-left
      >
        <template #cell(schedule)="row">
          <div class="d-flex justify-content-center ">
            {{ row.item.start.replace(/:\d\d$/gm, '') }} -
            {{ row.item.end.replace(/:\d\d$/gm, '') }}
          </div>
        </template>

        <template v-slot:cell(actions)="data">
          <div class="d-flex justify-content-center ">
            <b-button
              @click="editSchedule(data.item)"
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
    <schedule-form idModal="modalEdit" title="Editar Turno" />
  </div>
</template>

<script>
import ScheduleForm from '../components/ScheduleForm'
import handleData from '../mixins/handleData.js'

export default {
  components: {
    ScheduleForm
  },
  name: 'ScheduleList',
  mixins: [handleData],
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: 'Turno',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: `schedule`,
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
    this.get('shifts')
  },
  methods: {
    editSchedule (item) {
      this.$root.$emit('bv::show::modal', 'modalEdit', item)
    },
    delSchedule (id) {
      this.delete('shifts', id)
    }
  }
}
</script>
