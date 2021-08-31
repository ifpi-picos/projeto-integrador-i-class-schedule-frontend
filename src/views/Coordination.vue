<template>
  <skeleton>
    <coordination-form
      idModal="modalAdd"
      title="Nova coordenação"
      @save="saveCoordination"
    />
    <b-card>
      <b-card-header class="pt-0 pl-0 pr-0">
        <b-row align-h="between">
          <b-col>
            <h3>Coordenações</h3>
          </b-col>
          <b-col class="text-right">
            <b-button variant="success" v-b-modal.modalAdd>
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
  </skeleton>
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
  methods: {
    saveCoordination (payload) {
      console.log('emit coordination')
      console.log(payload)
      this.$bvModal.hide('modalAdd')
    }
  }
}
</script>

<style lang=""></style>
