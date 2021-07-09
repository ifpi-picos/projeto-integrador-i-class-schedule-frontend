<template>
  <div>
    <div class="d-flex justify-content-center mt-3 mb-3" v-if="loading">
      <b-spinner
        style="width: 3rem; height: 3rem"
        variant="success"
        label="Spinning"
      ></b-spinner>
    </div>
    <div v-if="!loading">
      <b-table
        table-class="border-bottom"
        head-variant="light"
        hover
        responsive
        :items="classes"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex align-items-center">
            <b-button
              @click="editClass(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delClass(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <class-form idModal="modalEdit" :idClass="idClass" />
  </div>
</template>

<script>
// import { Loading } from "element-ui";
import ClassForm from './ClassForm.vue'

export default {
  name: 'ClassList',
  components: {
    ClassForm
  },

  data () {
    return {
      idClass: '',
      classes: [],
      fields: [
        {
          key: 'nome',
          label: 'Turma',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'curso',
          label: 'curso',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'modulo',
          label: 'Módulo',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'local',
          label: 'sala',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'horario',
          label: 'Horário',
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
    
  },
  
}
</script>

<style scoped></style>
