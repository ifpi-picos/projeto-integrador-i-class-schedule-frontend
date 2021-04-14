<template>
  <skeleton>
    <room-form idModal="modalAdd" title="Nova Sala" />
    <b-card>
      <b-card-header class="pt-0 pl-0 pr-0">
        <b-row align-h="between">
          <b-col>
            <h3>Salas de aula</h3>
          </b-col>
          <b-col class="text-right">
            <b-button variant="success" v-b-modal.modalAdd>
              <i class="ni ni-fat-add"></i>
              Adcionar</b-button
            >
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body class="p-0">
        <room-list />
      </b-card-body>
    </b-card>
  </skeleton>
</template>

<script>
import RoomForm from '../components/RoomForm.vue'
import RoomList from '../components/RoomList.vue'

export default {
  components: {
    RoomList,
    RoomForm
  },
  name: 'Rooms'
}
</script>

<style></style>
