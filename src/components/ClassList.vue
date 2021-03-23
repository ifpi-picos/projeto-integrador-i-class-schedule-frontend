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
        table-class="border-bottom"
        head-variant="light"
        hover
        responsive
        :items="classes"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex align-items-center">
            <b-button
              @click="editClass(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delClass(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <class-form idModal="modalEdit" :idClass="idClass" />
  </div>
</template>

<script>
// import { Loading } from "element-ui";
import ClassForm from './ClassForm.vue'

export default {
  name: 'ClassList',
  components: {
    ClassForm
  },

  data () {
    return {
      idClass: '',
      classes: [],
      fields: [
        {
          key: 'nome',
          label: 'Turma',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'curso',
          label: 'curso',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'modulo',
          label: 'Módulo',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'local',
          label: 'sala',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'horario',
          label: 'Horário',
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
    this.getClassesOnChange(), this.getClasses()
  },
  methods: {
    async getClasses () {
      this.loading = true
      this.classes = []
      this.$firebase
        .firestore()
        .collection('turmas')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const classRoom = doc.data()
            classRoom.id = doc.id
            this.classes.push(classRoom)
            this.loading = false
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },

    getClassesOnChange () {
      this.$firebase
        .firestore()
        .collection('turmas')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const classRoom = change.doc.data()
              classRoom.id = change.doc.id
              this.classes.push(classRoom)
            }
            if (change.type === 'modified') {
              console.log('Modified city: ', change.doc.data())
              this.classes.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  const classUpdate = change.doc.data()
                  classUpdate.id = change.doc.id
                  this.$set(this.classes, index, classUpdate)
                }
              })
            }
            if (change.type === 'removed') {
              console.log('Removed city: ', change.doc.data())
              this.classes.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  this.classes.splice(index, 1)
                }
              })
            }
          })
        })
    },

    editClass (id, button) {
      this.idClass = id
      //this.$refs.modaledit.show();
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delClass (id) {
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
            this.$firebase
              .firestore()
              .collection('turmas')
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
    }
  }
}
</script>

<style scoped></style>
