<template>
  <div>
    <spinner :showLoad="true" v-if="loader" />
    <div v-if="!loader">
      <b-table
        v-if="coordinations[0]"
        head-variant="light"
        hover
        responsive
        thClass="text-red"
        thead-tr-class="pb-4 pt-4"
        tbody-tr-class=""
        :items="coordinations"
        :fields="fields"
      >
        <template v-slot:cell(actions)="data">
          <div class="d-flex justify-content-center">
            <b-button
              @click="editCoordination(data.item.id)"
              variant="outline-dark"
              size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delCoordination(data.item.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>
    <coordination-form
      idModal="modalEdit"
      :IdCoordination="coordinationId"
      title="Atulaizar Coordenação"
    />
  </div>
</template>

<script>
import CoordinationForm from './CoordinationForm.vue'
export default {
  name: 'CoordinationList',
  components: {
    CoordinationForm
  },
  data () {
    return {
      coordinationId: '',
      coordinations: [],
      fields: [
        {
          key: 'nome',
          label: 'curso',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'responsavel',
          label: 'Responsável',
          tdClass: 'font-weight-600 name  text-sm ',
          sortable: true
        },
        {
          key: 'email',
          label: 'E-mail',
          tdClass: 'font-weight-600 name text-sm ',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Ações',
          thClass: 'text-center'
        }
      ],
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
            this.loader = false
            if (change.type === 'added') {
              coordination.id = change.doc.id
              this.coordinations.push(coordination)
            }
            if (change.type === 'modified') {
              this.coordinations.forEach((item, index) => {
                if (change.doc.id === item.id) {
                  const coordinationUpdate = change.doc.data()
                  coordinationUpdate.id = change.doc.id
                  this.$set(this.coordinations, index, coordinationUpdate)
                }
              })
            }
            if (change.type === 'removed') {
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
