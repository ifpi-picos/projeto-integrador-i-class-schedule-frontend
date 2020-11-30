<template>
  <div>
    <el-table
      v-if="rooms"
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="rooms"
    >
      <el-table-column label="Sala" min-width="310px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.nome
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Turmas" prop="budget" min-width="180px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">
                {{ row.nome }}
              </span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column> -->

      <el-table-column label="Ações" min-width="140px">
        <template v-slot="{ row }">
          <div class="d-flex align-items-center">
            <b-button @click="editRoom(row.id)" variant="outline-dark" size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delRoom(row.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <room-form idModal="modalEdit" :idroom="roomId" title="Atulaizar Sala" />
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
import RoomForm from './RoomForm.vue'

export default {
  name: 'roomList',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    RoomForm
  },

  data () {
    return {
      roomId: '',
      rooms: []
    }
  },
  created () {
    this.getRooms()
  },
  methods: {
    async getRooms () {
      this.$firebase
        .firestore()
        .collection('salas')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            const room = change.doc.data()
            console.log('interação')
            if (change.type === 'added') {
              room.id = change.doc.id
              this.rooms.push(room)
            }
            if (change.type === 'modifeid') {
              console.log('Modified: ', change.doc.data())
            }
            if (change.type === 'removed') {
              console.log('Removed : ', change.doc.data())
              const index = this.rooms.indexOf(room)
              console.log(index)
              this.rooms.splice(index, 1)
            }
          })
        })
    },
    editRoom (id, button) {
      this.roomId = id
      //this.$refs.modaledit.show();
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delRoom (id) {
      this.$bvModal
        .msgBoxConfirm('Tem certeza que deseja deletar?', {
          title: 'Confirmação',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          cancelVariant: 'primary',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
          okTitle: 'Sim',
          cancelTitle: 'Não'
        })
        .then(value => {
          if (value) {
            //refFirebase.child(id).remove()
            this.$firebase
              .firestore()
              .collection('salas')
              .doc(id)
              .delete()
              .then(() => {
                console.log('apagado')
              })
              .catch(erro => {
                console.error(error)
              })
          }
        })
        .catch(e => {
          console.log(e)
        })
      // delroom (id) {
      //   const refFirebase = this.$firebase.database().ref('professores')

      //   this.$bvModal
      //     .msgBoxConfirm('Tem certeza que deseja deletar?', {
      //       title: 'Confirmação',
      //       size: 'sm',
      //       buttonSize: 'sm',
      //       okVariant: 'danger',
      //       cancelVariant: 'primary',
      //       headerClass: 'p-2 border-bottom-0',
      //       footerClass: 'p-2 border-top-0',
      //       centered: true,
      //       okTitle: 'Sim',
      //       cancelTitle: 'Não'
      //     })
      //     .then(value => {
      //       if (value) {
      //         refFirebase.child(id).remove()
      //       }
      //     })
      //     .catch(e => {
      //       console.log(e)
      //     })
    }
  }
}
</script>

<style scoped></style>
