<template>
  <b-modal
    @ok="handleOk"
    size="sm"
    centered
    :id="idModal"
    :ref="idModal"
    :title="title"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de Sala de aulas</h6>

      <div>
        <b-row>
          <b-col lg="12">
            <base-input
              type="text"
              label="Nome da Sala"
              placeholder="Sala"
              v-model="room.name"
              required
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'RoomForm',
  data () {
    return {
      room: {
        name: ''
      }
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    idroom: {
      type: String,
      default: '',
      description: 'id do professor que vai ser atualizado'
    },
    title: {
      type: String,
      description: 'titulo do modal'
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      console.log(valid)
      return valid
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // const refFirebase = this.$firebase.database().ref("salas");
      // const id = this.idroom? this.idroom : refFirebase.push().key;

      const payload = {
        nome: this.room.name,
        createdAt: new Date().getTime()
      }
      if (!this.checkFormValidity()) {
        return
      }

      this.$firebase
        .firestore()
        .collection('salas')
        .add(payload)
        .then(() => {
          console.log('foi')
        })
        .catch(error => console.error(error))
    }
  }
}
//    async fillForm(){

//     if(this.idroom){
//       const refFirebase = this.$firebase.database().ref(`salas`)
//       await refFirebase.on('value', (snapshot) => {
//         const data = snapshot.child(this.idroom).val();
//         this.room.name = data.nome
//       })
//     }
//   }
//  },
//   watch: {
//     idroom(){
//       this.fillForm()
//     },
//     room(){
//       this.checkFormValidity()
//     }
</script>

<style></style>
