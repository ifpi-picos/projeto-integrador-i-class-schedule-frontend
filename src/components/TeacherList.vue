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
        :items="teachers"
        :fields="fields"
        sort-by="nome"
        sort-icon-left
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex align-items-center">
            <b-button
              @click="editTeacher(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delTeacher(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <teacher-form
      idModal="modalEdit"
      :idTeacher="teacherId"
      title="Atulaizar Professor"
    />
  </div>
</template>

<script>
import TeacherForm from './TeacherForm.vue'

export default {
  name: 'TeacherList',
  components: {
    TeacherForm
  },

  data () {
    return {
      teacherId: '',
      teachers: [],
      fields: [
        {
          key: 'nome',
          label: 'Professor',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'area_de_ocupacao',
          label: 'Area de atuação',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'turmas',
          label: 'Turmas',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'disciplinas',
          label: 'Disciplinas',
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
    this.getTeachers()
  },
  methods: {
    async getTeachers () {
      this.loading = true
      this.teachers = []
      this.$firebase
        .firestore()
        .collection('professores')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            const teacher = change.doc.data()
            console.log(change.type)
            if (change.type === 'added') {
              teacher.id = change.doc.id
              this.teachers.push(teacher)
              this.loading = false
            }
            if (change.type === 'modified') {
              console.log('Modified: ', change.doc.data())
              this.teachers.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  const teacherUpdate = change.doc.data()
                  teacherUpdate.id = change.doc.id
                  this.$set(this.teachers, index, teacherUpdate)
                }
              })
            }
            if (change.type === 'removed') {
              console.log('Removed : ', change.doc.data())
              this.teachers.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  this.teachers.splice(index, 1)
                }
              })
            }
          })
        })
    },

    editTeacher (id, button) {
      this.teacherId = id
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delTeacher (id) {
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
              .collection('professores')
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
