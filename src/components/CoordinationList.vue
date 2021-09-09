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
        head-variant="light"
        hover
        responsive
        thClass="text-red"
        thead-tr-class="pb-4 pt-4"
        tbody-tr-class=""
        :items="dataBase"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex justify-content-center">
            <b-button
              @click="editCoordination(data.item)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delCoordination(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <coordination-form idModal="modalEdit" title="Atulaizar Coordenação" />
  </div>
</template>

<script>
import CoordinationForm from './CoordinationForm.vue'
import handleData from '../mixins/handleData.js'
export default {
  name: 'CoordinationList',
  components: {
    CoordinationForm
  },
  mixins: [handleData],
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: 'curso',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'coordinationTeacher.name',
          label: 'Responsável',
          tdClass: 'font-weight-600 name  text-sm ',
          sortable: true
        },
        {
          key: 'email',
          label: 'E-mail',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
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
    this.get('coordinations')
  },
  methods: {
    editCoordination (item) {
      this.$root.$emit('bv::show::modal', 'modalEdit', item)
    },
    delCoordination (id) {
      this.delete('coordinations', id)
    }
  }
}
</script>

<style lang="scss">
.centralizar {
  display: flex !important;
  justify-content: center !important;
}
</style>
