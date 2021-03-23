<template>
  <div>
    <div class="d-flex justify-content-center mt-3 mb-3" v-if="loading">
      <b-spinner
        style="width: 3rem; height: 3rem"
        variant="success"
        label="Spinning"
      ></b-spinner>
    </div>
    <div v-if="true">
      <b-table
        v-if="true"
        head-variant="light"
        hover
        responsive
        table-class="border-bottom"
        thead-tr-class="text-center"
        tbody-tr-class="text-center"
        :items="dataBase.rows"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex justify-content-center">
            <b-button
              @click="editRoom(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delRoom(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
      {{ dataBase }}
    </div>

    <room-form idModal="modalEdit" :idroom="roomId" title="Atulaizar Sala" />
  </div>
</template>

<script>
import RoomForm from './RoomForm.vue'
import handleData from '../mixins/handleData.js'

export default {
  name: 'roomList',
  components: {
    RoomForm
  },
  mixins: [handleData],

  data () {
    return {
      roomId: '',
      rooms: true,
      fields: [
        {
          key: 'name',
          label: 'Sala',
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
    this.get('rooms')
  },
  methods: {
    // async getRooms () {},
    editRoom (id, button) {},
    delRoom (id) {}
  }
}
</script>

<style scoped></style>
