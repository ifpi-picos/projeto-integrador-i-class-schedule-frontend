<template>
  <b-modal size="sm" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de Sala de aulas</h6>

      <div>
        <b-row>
          <b-col lg="12">
            <base-input
              type="text"
              name="Sala"
              label="Sala"
              placeholder="Sala"
              v-model="room.name"
              required
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
    <template #modal-footer="{ hide }">
      <b-button variant="outline-danger" @click="hide('forget')">
        Cancelar
      </b-button>
      <b-button
        :disabled="!checkFormValidity()"
        variant="success"
        @click="handleOk()"
      >
        Salvar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { api } from "../services/index";
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomForm",
  data() {
    return {
      room: {
        name: "",
      },
    };
  },
  props: {
    idModal: {
      type: String,
      default: "",
      description: "referencia do modal",
    },
    idroom: {
      type: String,
      default: "",
      description: "id do sala que vai ser atualizado",
    },
    title: {
      type: String,
      description: "titulo do modal",
    },
  },
  computed: {
    ...mapState(["data_base"]),
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form && this.$refs.form.checkValidity();
      return valid;
    },
    async handleOk(bvModalEvt) {
      // Trigger submit handler
      const a = await this.handleSubmit();
      this.$refs[this.idModal].hide();
    },
    handleSubmit() {
      const payload = {
        name: this.room.name,
      };
      if (!this.checkFormValidity()) {
        return;
      }
      if (this.idroom) {
        console.log(this.idroom);
        // this.$store.dispatch("getDatabase");
        api.put(`/rooms/${this.idroom}`, payload).then((response) => {
          this.$store.dispatch("getDatabase");
        });
      } else {
        console.log("idroom nao existe");
        api
          .post("/rooms", payload)
          .then((response) => {
            this.$store.dispatch("getDatabase");
          })
          .catch();
      }
    },
    async fillForm() {
      const roomIndex = this.data_base.rows.findIndex(
        (data) => data.id === Number(this.idroom)
      );
      console.log(roomIndex);
      this.room.name = this.data_base.rows[roomIndex].name;
      // const payload = {
      //   name: this.room.name,
      // };
      if (this.idroom) {
        console.log(this.idroom);
        // this.$firebase
        //   .firestore()
        //   .collection("salas")
        //   .doc(this.idroom)
        //   .get()
        //   .then((querySnapshot) => {
        //     const data = querySnapshot.data();
        //     this.room.name = data.nome;
        //   })
        //   .catch((error) => {
        //     console.log("Error getting documents: ", error);
        //   });
      }
    },
  },

  watch: {
    idroom() {
      this.fillForm();
    },
    room() {
      this.checkFormValidity();
    },
  },
};
</script>

<style></style>
