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
          <b-col lg="7">
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
        
          <b-col lg="4">
            <base-input label="Turno" required>
                <select v-model="clas.shift" class="form-control">
                  <option >Manhã</option>
                  <option >Tarde</option>
                  <option >Noite</option>
                </select>
            </base-input>
          </b-col>

        </b-row>

        <b-row>
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

          <b-col lg="5">
            <base-input
            type="number"
            label="Módulo"
            placeholder="3"
            v-model="clas.module"
            name="modulo" 
            required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input label="Sala" required>
              <select v-model="clas.location" class="form-control">
                <option>Local 1</option>
                <option>Local 2</option>
                <option>Local 3</option>
                <option>Local 4</option>
              </select>
            </base-input>
          </b-col>

          <b-col lg="5">
            <base-input label="Horário" required>
              <select v-model="clas.houer" class="form-control" >
                <option >7:00 - 17:30</option>
                <option >13:00 - 18:00</option>
                <option >18:00 - 22:00</option>
              </select>
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import db from "../fb";
export default {
  name: "ClassForm",
  data() {
    return {
      clas: {
        username: "",
        shift: "",
        course: "",
        module: "",
        location: "",
        houer: "",
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
      // const refFirebase = this.$firebase.database().ref("turmas");
      // const id = this.idClas ? this.idClas : refFirebase.push().key;

      const payload = {
        nome: this.clas.username,
        turno: this.clas.shift,
        curso: this.clas.course,
        modulo: this.clas.module,
        local: this.clas.location,
        horario: this.clas.houer,
        createdAt: new Date().getTime(),
      };
      if (!this.checkFormValidity()) {
        return;
      }

      db.collection("turmas").add(payload).then(() =>{
        console.log("foi")
      })
      // refFirebase.child(id).set(payload, (error) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     this.$refs[this.idModal].hide();
      //     if (!this.idClas) {
      //       this.clas = {};
      //     }
      //   }
      // });
    },
  },
};
</script>

<style></style>