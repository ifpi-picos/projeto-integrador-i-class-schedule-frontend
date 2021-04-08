<template>
  <div>
    {{ dataBase }}
    <div
      class="d-flex justify-content-center mt-3 mb-3"
      v-if="loading === null"
    >
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
        responsive
        :items="dataBase.rows"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex align-items-center">
            <b-button
              @click="editTeacher(data.item)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delTeacher(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <teacher-form idModal="modalEdit" title="Atulaizar Professor" />
  </div>
</template>

<script>
import TeacherForm from './TeacherForm.vue'
import handleData from '../mixins/handleData.js'

export default {
  name: 'TeacherList',
  components: {
    TeacherForm
  },
  mixins: [handleData],
  data () {
    return {
      // teacherId: '',
      // teachers: [],
      fields: [
        {
          key: 'name',
          label: 'Professor',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'area_de_ocupacao',
          label: 'Area de atuação',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'turmas',
          label: 'Turmas',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'disciplinas',
          label: 'Disciplinas',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Ações'
        }
      ],
      loading: true
    }
  },
  created () {
    this.get('/teachers')
  },
  methods: {
    editTeacher (item) {
      this.$root.$emit('bv::show::modal', 'modalEdit', item)
    },
    delTeacher (id) {
      this.delete('teachers', id)
    }
  }
}
</script>

<style scoped></style>
