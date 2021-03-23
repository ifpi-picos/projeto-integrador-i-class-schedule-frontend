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
        v-if="rooms"
        head-variant="light"
        hover
        responsive
        table-class="border-bottom"
        thead-tr-class="text-center"
        tbody-tr-class="text-center"
        :items="rooms"
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
    </div>

    <room-form idModal="modalEdit" :idroom="roomId" title="Atulaizar Sala" />
  </div>
</template>

<script>
import RoomForm from "./RoomForm.vue";
import { api } from "@/services.js";

export default {
  name: "roomList",
  components: {
    RoomForm,
  },

  data() {
    return {
      roomId: "",
      rooms: [],
      fields: [
        {
          key: "nome",
          label: "Sala",
          tdClass: "font-weight-600 name text-sm ",
          sortable: true,
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
      loading: true,
    };
  },
  created() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      (this.rooms = []),
        api
          .get("/Rooms")
          .then((response) => {
            this.rooms = response.data;
          })
          .catch((erro) => {
            console.log(erro);
          });
    },
    // async getRooms() {
    //   this.loading = true;
    //   this.rooms = [];
    //   this.$firebase
    //     .firestore()
    //     .collection("salas")
    //     .onSnapshot((snapshot) => {
    //       snapshot.docChanges().forEach((change) => {
    //         const room = change.doc.data();
    //         if (change.type === "added") {
    //           room.id = change.doc.id;
    //           this.rooms.push(room);
    //           this.loading = false;
    //         }
    //         if (change.type === "modified") {
    //           console.log("Modified: ", change.doc.data());
    //           this.rooms.forEach((item, index) => {
    //             if (change.doc.id === item.id) {
    //               const roomUpdate = change.doc.data();
    //               roomUpdate.id = change.doc.id;
    //               this.$set(this.rooms, index, roomUpdate);
    //             }
    //           });
    //         }
    //         if (change.type === "removed") {
    //           console.log("Removed : ", change.doc.data());
    //           this.rooms.forEach((item, index) => {
    //             if (change.doc.id === item.id) {
    //               this.rooms.splice(index, 1);
    //             }
    //           });
    //         }
    //       });
    //     });
    // },
    // editRoom(id, button) {
    //   this.roomId = id;
    //   this.$root.$emit("bv::show::modal", "modalEdit", button);
    // },
    // delRoom(id) {
    //   this.$bvModal
    //     .msgBoxConfirm("Tem certeza que deseja deletar?", {
    //       title: "Confirmação",
    //       size: "sm",
    //       buttonSize: "sm",
    //       okVariant: "danger",
    //       cancelVariant: "primary",
    //       headerClass: "p-2 border-bottom-0",
    //       footerClass: "p-2 border-top-0",
    //       centered: true,
    //       okTitle: "Sim",
    //       cancelTitle: "Não",
    //     })
    //     .then((value) => {
    //       if (value) {
    //         this.$firebase
    //           .firestore()
    //           .collection("salas")
    //           .doc(id)
    //           .delete()
    //           .then(() => {
    //             console.log("apagado");
    //           })
    //           .catch((erro) => {
    //             console.error(error);
    //           });
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
  },
};
</script>

<style scoped></style>
