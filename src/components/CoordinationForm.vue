<template>
  <b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro das coordenações</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="11">
            <base-input
              type="text"
              label="Nome da coordenação"
              placeholder="Nome da coordenação"
              name="Nome da coordenação"
              v-model="registry.name"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="11">
            <div class="form-group">
              <!-- {{ teacher }} <br />
            {{ registry.idResponsible }} <br /> -->
              <AutoComplete
                v-model="teacher"
                :options="teachers"
                label-key="name"
                value-key="id"
                placeholder="Nome do responsável"
                @shouldSearch="searchTeachers"
                @select="onSelect"
              />
            </div>
          </b-col>
        </b-row>

        <!-- <b-row>
          <b-col lg="11">
            <b-form-select v-model="registry.idResponsible" class="mb-3">
              <b-form-select-option
                v-for="teacher in teachers"
                :key="teacher.id"
                :value="teacher.id"
                >{{ teacher.name }}</b-form-select-option
              >
            </b-form-select>
            <div class="mt-3">
              Selected: <strong>{{ registry.idResponsible }}</strong>
            </div>
          </b-col>
        </b-row> -->

        <!--<b-row>
          <b-col lg="11">
            <base-input
              type="text"
              label="Nome do responsável"
              placeholder="Nome do responsável"
              name="Nome do responsável"
              v-model="registry.idResponsible"
              required
            >
            </base-input>
          </b-col>
        </b-row>
        -->

        <b-row>
          <b-col lg="11">
            <base-input
              type="email"
              label="email do responsável"
              placeholder="coordenacao.edu@gmail.com"
              name="email"
              v-model="registry.email"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
    <template #modal-footer="{ hide }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button variant="outline-danger" @click="hide('forget')">
        Cancelar
      </b-button>
      <b-button
        :disabled="!checkFormValidity()"
        variant="success"
        @click="handleSubmit()"
      >
        Salvar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import modalForm from '../mixins/modalForm'
import AutoComplete from './AutoComplete.vue'

export default {
  name: 'CoordinationForm',
  mixins: [modalForm],
  components: {
    AutoComplete
  },
  data () {
    return {
      teachers: [],
      teacher: ''
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    IdCoordination: {
      type: String,
      default: '',
      description: 'id da coordenação que vai ser atualizada'
    },
    title: {
      type: String,
      description: 'titulo do modal'
    }
  },

  methods: {
    handleSubmit () {
      console.log(this.registry)
      this.handleOk('coordinations')
    },
    async searchTeachers (query) {
      try {
        const { data } = await this.$axios.get(
          `https://empty-coffee-cups.herokuapp.com/api/teachers/search?q=${query}`
        )
        this.teachers = data.data
        // if (query == '') {
        //   this.teachers = []
        // }
      } catch (err) {
        console.log(err)
      }
    },
    onSelect (teacher) {
      this.registry.idResponsible = teacher.id
      // this.registry.id = teacher.id
      // console.log(teacher.id)
    }
  }
}
</script>

<style lang=""></style>
