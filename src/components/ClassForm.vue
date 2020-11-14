<template>
  <b-modal
    @ok="handleOk"
    size="lg"
    centered
    :id="idModal"
    :ref="idModal"
    title="Nova turma"
  >
    <b-form ref="form" @submit.stop.prevent="Submit()">
      <h6 class="heading-small text-muted mb-4">Cadastro das turmas</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome da turma"
              placeholder="INFO III"
              v-model="clas.username"
              error="teste"
              rules="required"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="text"
              label="Curso"
              placeholder="Informática"
              v-model="clas.course"
              name="Curso"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input label="Local da aula">
              <select v-model="clas.location" class="form-control">
                <option>Local 1</option>
                <option>Local 2</option>
                <option>Local 3</option>
                <option>Local 4</option>
              </select>
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "ClassForm",
  data() {
    return {
      clas: {
        username: "",
        course: "",
        location: "",
      },
    };
  },
  props: {
    idModal: {
      type: String,
      default: "",
      description: "referencia do modal",
    },
    idClas: {
      type: String,
      default: "",
      description: "id da turma que vai ser atualizado",
    },
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      console.log(valid);
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.checkFormValidity();
      this.handleSubmit();
    },
    handleSubmit() {
      const refFirebase = this.$firebase.database().ref("turmas");
      const id = this.idClas ? this.idClas : refFirebase.push().key;

      const payload = {
        id,
        nome: this.clas.username,
        curso: this.clas.course,
        local: this.clas.location,
        createdAt: new Date().getTime(),
      };
      if (!this.checkFormValidity()) {
        return;
      }

      refFirebase.child(id).set(payload, (error) => {
        if (error) {
          console.log(error);
        } else {
          this.$refs[this.idModal].hide();
          if (!this.idClas) {
            this.clas = {};
          }
        }
      });
    },
  },
};
</script>