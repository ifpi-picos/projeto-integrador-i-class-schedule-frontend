<template>
  <div>
    <!-- <spinner :showLoad="true" v-if="loader" /> -->
    <div class="d-flex justify-content-center mt-3 mb-3" v-if="loading">
      <b-spinner
        style="width: 3rem; height: 3rem"
        variant="success"
        label="Spinning"
      ></b-spinner>
    </div>

    <div v-if="coordinations">
      <b-table
        v-if="coordinations[0]"
        head-variant="light"
        hover
        responsive
        thClass="text-red"
        thead-tr-class="pb-4 pt-4"
        tbody-tr-class=""
        :items="coordinations"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex justify-content-center">
            <b-button
              @click="editCoordination(data.item.id)"
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
    <coordination-form
      idModal="modalEdit"
      :IdCoordination="coordinationId"
      title="Atulaizar Coordenação"
    />
  </div>
</template>

<script>
import CoordinationForm from './CoordinationForm.vue'
export default {
  name: 'CoordinationList',
  components: {
    CoordinationForm
  },
  data () {
    return {
      coordinationId: '',
      coordinations: [],
      fields: [
        {
          key: 'nome',
          label: 'curso',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'responsavel',
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
      ],
      loading: true
    }
  },
  created () {
    this.getCoordinations()
  },
  
}
</script>

<style lang="scss">
.centralizar {
  display: flex !important;
  justify-content: center !important;
}
</style>
