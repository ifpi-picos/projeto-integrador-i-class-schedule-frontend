<template>
  <div>
    <spinner :showLoad="true" v-if="loader" />
    <div v-if="!loader">
      <el-table
        v-if="teachers[0]"
        class="table-responsive table"
        header-row-class-name="thead-light"
        :data="teachers"
      >
        <el-table-column label="Professor" min-width="300px" prop="name">
          <template v-slot="{ row }">
            <b-media no-body>
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">{{
                  row.nome
                }}</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column
          label="Area de Atuação"
          prop="budget"
          min-width="180px"
        >
          <template v-slot="{ row }">
            <b-media no-body>
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">{{
                  row.area_de_ocupacao
                }}</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column
          class="d-flex justify-content-center !important"
          label="Turmas"
          min-width="160px"
        >
          <template v-slot="{ row }">
            <b-media no-body>
              <b-media-body>
                <span class="d-flex justify-content-center">1</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Disciplinas" min-width="150px">
          <template v-slot="{ row }">
            <b-media no-body>
              <b-media-body>
                <span>4</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Ações" min-width="140px">
          <template v-slot="{ row }">
            <div>
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
    </div>
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
      teachers: [],
      loader: true
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
            this.loader = false
            if (change.type === 'added') {
              teacher.id = change.doc.id
              this.teachers.push(teacher)
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
