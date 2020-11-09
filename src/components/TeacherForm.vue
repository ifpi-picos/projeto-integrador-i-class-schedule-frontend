<template>
  <b-modal
    @ok="handleOk"
    size="lg"
    centered
    :id="idModal"
    :ref="idModal"
    title="Novo Professor"
  >
    <b-form ref="form" @submit.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de professores</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome *"
              placeholder="Nome"
              v-model="teacher.username"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="text"
              label="Matricula"
              placeholder="Ex.: SIAPE"
              v-model="teacher.registration"
              name="Matricula"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="email"
              label="E-mail *"
              placeholder="professor@email.com"
              v-model="teacher.email"
              required
              name="email"
            >
            </base-input>
          </b-col>
        </b-row>

        <!--hr class="my-4" />

        <h6 class="heading-small text-muted mb-4">
          Informações sobre o docente
        </h6-->

        <b-row>
          <b-col lg="6">
            <base-input label="Área de atuação *">
              <select v-model="teacher.occupationArea" class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input label="Cordenação" placeholder="">
              <select v-model="teacher.cordination" class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
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
  name: "TeacherForm",
  data() {
    return {
      teacher: {
        username: "",
        registration: "",
        email: "",
        occupationArea: "",
      },
      
    };
  },
  props: {
    idModal: {
      type: String,
      default: "",
      description:
        "referencia do modal"
    },
    idTeacher: {
      type: String,
      default: "",
      description:
        "referencia do modal"
    }
  },
  methods: {
    checkForm() {
      const valid = this.$refs.form.checkValidity();
      console.log(valid);
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      //bvModalEvt.preventDefault();
      // Trigger submit handler
      this.checkForm();
      this.handleSubmit();
    },
    handleSubmit() {
      const refFirebase = this.$firebase.database().ref("professores");
      const id = this.idTeacher? this.idTeacher : refFirebase.push().key;

      const payload = {
        id,
        nome: this.teacher.username,
        matricula: this.teacher.registration,
        email: this.teacher.email,
        area_de_ocupacao: this.teacher.occupationArea,
        createdAt: new Date().getTime(),
      };

      refFirebase.child(id).set(payload, (error) => {
        if (error) {
          console.log(error);
        } else {
          this.$refs[this.idModal].hide();
        }
      });
    },
     fillForm(){
       console.log("ok");
      if(this.idTeacher){
        const refFirebase = this.$firebase.database().ref(`professores`)
         refFirebase.on('value', (snapshot) => {
          const data = snapshot.child(this.idTeacher).val();
          this.teacher.username = data.nome 
          this.teacher.registration = data.matricula
          this.teacher.email = data.email
          this.teacher.occupationArea = data.area_de_ocupacao
        })
      }
    }
  },
  watch: {
    idTeacher(){
      this.fillForm()
    }
  }
};
</script>

<style></style>
