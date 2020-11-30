<template>
  <div>
    <el-table
      v-if="teachers"
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="teachers"
    >
      <el-table-column label="Professor" min-width="310px" prop="name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                this.getTeachers()
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
      title="Atualizar Professor"
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
      teachers: ''
    }
  },
  created () {
    this.getTeachers()
  },
  methods: {
    async getTeachers () {
      await this.$firebase
        .firestore()
        .collection('professores')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            return doc.data().name
          })
        })
    },
    editTeacher (id, button) {
      this.teacherId = id
      //this.$refs.modaledit.show();
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delTeacher (id) {
      const refFirebase = this.$firebase.database().ref('professores')

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
            refFirebase.child(id).remove()
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
