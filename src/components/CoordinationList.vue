<template>
  <div>
    <spinner :showLoad="true" v-if="loader" />
    <div v-if="!loader">
      <el-table
        v-if="coordinations[0]"
        class="table-responsive table"
        header-row-class-name="thead-light"
        :data="coordinations"
      >
        <el-table-column label="Curso" min-width="250px" prop="name">
          <template v-slot="{ row }">
            <b-media no-nody>
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm ">
                  {{ row.nome }}
                </span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Responsável" min-width="250px" prop="name">
          <template v-slot="{ row }">
            <b-media no-nody>
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">
                  {{ row.responsavel }}
                </span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column
          label="E-mail do responsável"
          min-width="300px"
          prop="name"
        >
          <template v-slot="{ row }">
            <b-media no-nody>
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">
                  {{ row.email }}
                </span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>

        <el-table-column label="Ações" min-width="140px">
          <template v-slot="{ row }">
            <div>
              <b-button
                @click="editCoordination(row.id)"
                variant="outline-dark"
                size="sm"
                ><i class="fas fa-pen"></i
              ></b-button>

              <b-button
                @click="delCoordination(row.id, $event.target)"
                variant="outline-danger"
                size="sm"
                ><i class="fas fa-trash"></i
              ></b-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <coordination-form
      idModal="modalEdit"
      :IdCoordination="coordinationId"
      title="Atulaizar Coordenação"
    />
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
import CoordinationForm from './CoordinationForm.vue'
// import Spinner from './Spinner.vue'
export default {
  name: 'CoordinationList',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    CoordinationForm
  },
  data () {
    return {
      coordinationId: '',
      coordinations: [],
      loader: true
    }
  },
  created () {
    this.getCoordinations()
  },
  methods: {
    async getCoordinations () {
      this.$firebase
        .firestore()
        .collection('coordenacoes')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            const coordination = change.doc.data()
            console.log(change.type)
            this.loader = false
            if (change.type === 'added') {
              coordination.id = change.doc.id
              this.coordinations.push(coordination)
            }
            if (change.type === 'modified') {
              console.log('Modified: ', change.doc.data())
              this.coordinations.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  const coordinationUpdate = change.doc.data()
                  coordinationUpdate.id = change.doc.id
                  this.$set(this.coordinations, index, coordinationUpdate)
                }
              })
            }
            if (change.type === 'removed') {
              console.log('Removed : ', change.doc.data())
              this.coordinations.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  this.coordinations.splice(index, 1)
                }
              })
            }
          })
        })
    },

    editCoordination (id, button) {
      this.coordinationId = id
      console.log(id)
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
    delCoordination (id) {
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
              .collection('coordenacoes')
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

<style lang="scss">
.centralizar {
  display: flex !important;
  justify-content: center !important;
}
</style>
