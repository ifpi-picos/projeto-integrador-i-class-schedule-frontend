<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
    ></base-header>
    <!-- FORMULÁRIO DE CADASTRO DAS COORDENAÇÕES -->
    <CoordinationForm idModal="addcoordination" title="Nova coordenação" />

    <b-container fluid class="mt--7">
      <b-card>
        <b-card-header class="pt-0 pl-0 pr-0">
          <b-row align-h="between">
            <b-col>
              <h3>coordenações</h3>
            </b-col>
            <b-col class="text-right">
              <b-button variant="success" v-b-modal.addcoordination>
                <i class="ni ni-fat-add"></i>
                Adicionar
              </b-button>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body class="p-0">
          <!-- LISTA DAS CORDENAÇÕES -->
          <coordination-list />
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import CoordinationForm from '@/components/CoordinationForm.vue'
import CoordinationList from '@/components/CoordinationList.vue'
export default {
  name: 'Coordinations',
  components: {
    CoordinationForm,
    CoordinationList
  },
  data () {
    return {}
  }
}
</script>

<style lang=""></style>
