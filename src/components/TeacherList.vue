<template>
  <div>
    <el-table
      v-if="teachers[0]"
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="teachers"
    >
      <el-table-column label="Professor" min-width="310px" prop="name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.nome
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Area de Atuação" prop="budget" min-width="180px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.area_de_ocupacao
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Turmas" min-width="170px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span>1</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Disciplinas" min-width="150px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span>4</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Ações" min-width="140px">
        <template v-slot="{ row }">
          <div class="d-flex align-items-center">
            <b-button
              @click="editTeacher(row.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delTeacher(row.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <teacher-form
      idModal="modalEdit"
      :idTeacher="teacherId"
      title="Atulaizar Professor"
    />
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
import TeacherForm from './TeacherForm.vue'

export default {
  name: 'TeacherList',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    TeacherForm
  },

  data () {
    return {
      teacherId: '',
      teachers: []
    }
  },
  created () {
    this.getTeachers()
  },
  methods: {
    async getTeachers () {
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
            }
            if (change.type === 'modified') {
              console.log('Modified: ', change.doc.data())
              this.teachers.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  this.$set(this.teachers, index, change.doc.data())
                  //this.teachers[index] = change.doc.data()
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
      //this.$refs.modaledit.show();
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
            //refFirebase.child(id).remove()
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
