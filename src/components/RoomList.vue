<template>
  <div>
    <div
      v-if="dataBase === null"
      class="d-flex justify-content-center mt-3 mb-3"
    >
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
        table-class="border-bottom"
        thead-tr-class="text-center"
        tbody-tr-class="text-center"
        :items="data_base.rows"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
        show-empty
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

        <template #empty>
          <h4>Sem dados</h4>
        </template>
      </b-table>
      <p>{{ dataBase }}</p>

      <p>{{ data_base }}</p>
    </div>

    <room-form idModal="modalEdit" :idroom="roomId" title="Atualizar Sala" />
  </div>
</template>

<script>
import RoomForm from "./RoomForm.vue";
import handleData from "../mixins/handleData.js";
import { mapState, mapActions } from "vuex";
import { api } from "../services";

export default {
  name: "roomList",
  components: {
    RoomForm,
  },
  mixins: [handleData],

  data() {
    return {
      roomId: "",
      fields: [
        {
          key: "name",
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
      ultimo: null,
    };
  },
  computed: {
    ...mapState(["data_base"]),
  },
  created() {
    this.get("rooms");
    this.getDatabase();
  },
  methods: {
    ...mapActions(["getDatabase"]),
    // async getRooms () {},
    editRoom(id, button) {
      this.roomId = "" + id;
      this.$root.$emit("bv::show::modal", "modalEdit", button);
    },
    delRoom(id) {
      this.$bvModal
        .msgBoxConfirm("Tem certeza que deseja deletar?", {
          title: "Confirmação",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          cancelVariant: "primary",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
          okTitle: "Sim",
          cancelTitle: "Não",
        })
        .then((value) => {
          if (value) {
            api.delete(`/rooms/${id}`).then(() => {
              const roomIndex = this.dataBase.rows.findIndex(
                (data) => data.id === id
              );
              this.dataBase.rows.splice(roomIndex, 1);
              this.$store.dispatch("getDatabase");
            });
          }
        });
    },
  },
};
</script>

<style scoped></style>
