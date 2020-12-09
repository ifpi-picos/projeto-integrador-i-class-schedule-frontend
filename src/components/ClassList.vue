<template>
  <div>
    <spinner :showLoad="true" v-if="loader" />
    <div v-if="!loader">
      <el-table
        v-if="classes"
        class="table-responsive table"
        header-row-class-name="thead-light"
        :data="classes"
      >
        <el-table-column label="Turma" min-width="210px" prop="name">
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

        <el-table-column label="Curso" prop="budget" min-width="180px">
          <template v-slot="{ row }">
            <b-media no-body class="align-items-center">
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">{{
                  row.curso
                }}</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Módulo" prop="budget" min-width="130px">
          <template v-slot="{ row }">
            <b-media no-body>
              <b-media-body>
                <span
                  class="d-flex justify-content-center font-weight-600 name mb-0 text-sm"
                  >{{ row.modulo }}</span
                >
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Sala" min-width="130px">
          <template v-slot="{ row }">
            <b-media no-body class="align-items-center">
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">{{
                  row.local
                }}</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Horário" min-width="160px" prop="status">
          <template v-slot="{ row }">
            <b-media no-body class="align-items-center">
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">{{
                  row.horario
                }}</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Ações" min-width="120px">
          <template v-slot="{ row }">
            <div class="d-flex align-items-center">
              <b-button
                @click="editClas(row.id)"
                variant="outline-dark"
                size="sm"
                ><i class="fas fa-pen"></i
              ></b-button>

              <b-button
                @click="delClass(row.id, $event.target)"
                variant="outline-danger"
                size="sm"
                ><i class="fas fa-trash"></i
              ></b-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <class-form idModal="modalEdit" :idClass="idClass" />
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
import ClassForm from './ClassForm.vue'

export default {
  name: 'ClassList',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    ClassForm
    // Spinner
  },

  data () {
    return {
      idClass: '',
      classes: [],
      loader: true
    }
  },
  created () {
    this.getClassesOnChange(), this.getClasses()
  },
  methods: {
    async getClasses () {
      this.$firebase
        .firestore()
        .collection('turmas')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const classRoom = doc.data()
            this.loader = false
            classRoom.id = doc.id
            this.classes.push(classRoom)
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
                  const classUpdate =  change.doc.data()
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

    editClas (id, button) {
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
