<template>
  <div>
    <spinner :showLoad="true" v-if="loader" />

    <div v-if="!loader">
      <b-table
        head-variant="light"
        hover
        responsive
        table-class="border-bottom"
        :items="subjects"
        :fields="fields"
         sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex align-items-center">
            <b-button
              @click="editsubject(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delsubject(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <subject-form
      idModal="modalEdit"
      title="Editar Disciplina"
      :subjectId="subjectId"
    />
  </div>
</template>

<script>
import SubjectForm from '../components/SubjectForm'
export default {
  components: {
    SubjectForm
  },
  name: 'SubjectsList',
  data () {
    return {
      subjectId: '',
      subjects: [],
      fields: [
        {
          key: 'nome',
          label: 'Nome da discipina',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'carga_horaria',
          label: 'Carga Horária',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Ações'
        }
      ],
      loader: true
    }
  },
  created () {
    this.getSubjects()
  },
  methods: {
    async getSubjects () {
      this.$firebase
        .firestore()
        .collection('disciplinas')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            this.loader = false
            if (change.type === 'added') {
              const subject = change.doc.data()
              subject.id = change.doc.id
              this.subjects.push(subject)
            }
            if (change.type === 'modified') {
              console.log('Modified: ', change.doc.data())
              this.subjects.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  const subjectUpdate = change.doc.data()
                  subjectUpdate.id = change.doc.id
                  this.$set(this.subjects, index, subjectUpdate)
                }
              })
            }
            if (change.type === 'removed') {
              console.log('Removed : ', change.doc.data())
              this.subjects.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  this.subjects.splice(index, 1)
                }
              })
            }
          })
        })
    },
    editsubject (id, button) {
      this.subjectId = id
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delsubject (id) {
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
              .collection('disciplinas')
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

<style></style>
