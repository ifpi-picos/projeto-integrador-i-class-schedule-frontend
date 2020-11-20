<template>
  <b-modal
    @ok="handleOk"
    size="lg"
    centered   
    :id="idModal"
    :ref="idModal"
    :title="title"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de professores</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome"
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
              placeholder="Ex.: SIAPE "
              v-model="teacher.registration"
              name="Matricula"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="email"
              label="E-mail"
              placeholder="professor@email.com"
              v-model="teacher.email"
              required
              name="email"
            >
            </base-input>
          </b-col>
        </b-row>


        <b-row>
          <b-col lg="6">
            <base-input label="Área de atuação" required >
              <select v-model="teacher.occupationArea" class="form-control">
                <option>Informatica</option>
                <option>2</option>
                <option>3</option>
              </select>
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input label="cordenacao" required>
              <select v-model="teacher.coordination" class="form-control">
                <option>Cordenação ADS</option>
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
        coordination: ""
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
        "id do professor que vai ser atualizado"
    },
    title: {
      type: String,
      description:
        "titulo do modal"
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      console.log(valid);
      return valid
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
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
        cordenacao: this.teacher.coordination,
        createdAt: new Date().getTime(),
      };
      if (!this.checkFormValidity()) {
          return
      }

      refFirebase.child(id).set(payload, (error) => {
        //this.$refs[this.idModal].okDisabled = true; 
        if (error) {
          console.log(error);
        } else {
          this.$refs[this.idModal].hide();
          if(!this.idTeacher){
            this.teacher = {}
          }
        }
      });
    },
     async fillForm(){
      
      if(this.idTeacher){
        const refFirebase = this.$firebase.database().ref(`professores`)
        await refFirebase.on('value', (snapshot) => {
          const data = snapshot.child(this.idTeacher).val();
          this.teacher.username = data.nome 
          this.teacher.registration = data.matricula
          this.teacher.email = data.email
          this.teacher.occupationArea = data.area_de_ocupacao
          this.teacher.coordination= data.cordenacao
        })
      }
    }
  },
  watch: {
    idTeacher(){
      this.fillForm()
    },
    teacher(){
      this.checkFormValidity()
    }
  }
};
</script>

<style></style>
