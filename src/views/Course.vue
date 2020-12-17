<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
    ></base-header>

    <b-container fluid class="mt--7">
      <b-card>
        <b-card-header>
          <b-row align-h="between">
            <b-col>
              <h3>Cadastrar curso</h3>
            </b-col>
          </b-row>
        </b-card-header>

        <b-card-body>
          <b-form ref="form">
            <b-row>
              <b-col lg="12">
                <base-input
                  type="text"
                  label="Nome do curso"
                  v-model="course.name"
                  placeholder=""
                  name="Nome do curso"
                  required
                >
                </base-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="4">
                <base-input label="Modalidade" required>
                  <b-form-select
                    class="form-control"
                    required
                    v-model="course.modalities"
                    :options="modalities"
                  >
                  </b-form-select>
                </base-input>
              </b-col>

              <b-col lg="4">
                <base-input
                  type="number"
                  label="Módulos"
                  v-model="course.modules"
                  placeholder=""
                  name="Módulos"
                  required
                >
                </base-input>
              </b-col>

              <b-col lg="4">
                <base-input
                  type="number"
                  label="Carga Horária"
                  v-model="course.workload"
                  placeholder=""
                  name="Carga Horária"
                  required
                >
                </base-input>
              </b-col>
            </b-row>
          </b-form>

          <h3 class="pt-3 pb-4">Disciplinas</h3>

          <div class="border-top jumbotron jumbotron-fluid bg-white pt-2 pb-2">
            <div class="container">
              <b-row
                class="pt-3 pb-3"
                v-for="(modules, index) in modules"
                :key="index"
              >
                <b-col> Módulo {{ index + 1 }} </b-col>

                <b-col class="text-right">
                  <button @click="addModule" class="btn btn-success rounded ">
                    <i class="fa fa-plus "></i>
                  </button>
                </b-col>
              </b-row>
              <b-card>
                <b-row
                  v-for="(discipline, index) in disciplines"
                  :key="index"
                  class="mb-10 "
                >
                  {{ index }}
                  <!-- NOME DA DISCIPLINA -->
                  <b-col lg="5" class="mb-10 ">
                    <base-input
                      type="text"
                      label="Disciplina"
                      v-model="discipline.name"
                      placeholder=""
                      name="Disciplina"
                      required
                    >
                    </base-input>
                  </b-col>
                  <!-- CARGA HORÁRIA DA DISCIPLINA -->
                  <b-col lg="2">
                    <base-input
                      type="number"
                      label="Carga Horária"
                      v-model="discipline.workload"
                      placeholder=""
                      name="Carga Horária"
                      required
                    >
                    </base-input>
                  </b-col>
                </b-row>
                <b-col class="text-right">
                  <button
                    @click="addDiscipline"
                    class="btn btn-success rounded "
                  >
                    <i class="fa fa-plus "></i>
                  </button>
                </b-col>
                {{ disciplines }}
              </b-card>
            </div>
          </div>

          <!--
          <b-table
            stacked
            :items="items"
            :fields="fields"
            responsive="sm"
            details-td-class="bg-light"
            v-if="checkFormValidity()"
          >
            <template #cell(show_details)="row">
              <b-button
                variant="success"
                size="sm"
                @click="row.toggleDetails"
                class="mr-2"
              >
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>
            </template>

            <template #row-details="row">
              <b-card>
                <b-row class="mb-10 ">
                 
                  <b-col lg="5" class="mb-10 ">
                    <input
                      v-for="i in discipline.inputs"
                      :key="i"
                      type="text"
                      class="form-control"
                      :id="'item' + i"
                      placeholder=""
                      v-model="discipline.name"
                    />
                  </b-col>
              
                  <b-col lg="2">
                    <input
                      v-for="i in discipline.inputs"
                      :key="i"
                      type="time"
                      class="form-control mb-10"
                      :id="'item' + i"
                      placeholder=""
                      v-model="discipline.ch"
                    />
                  </b-col>
                </b-row>
                <b-col class="text-right">
                  <button
                    style="border-radius:100%;"
                    @click="discipline.inputs++"
                    class="btn btn-success"
                    type="button"
                  >
                    <i class="fa fa-plus "></i>
                  </button>
                </b-col>

                 <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
                  <b-col>{{ row.item.isActive }}</b-col>
                </b-row> 
              </b-card>
            </template>
          </b-table>
          -->
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import BaseInput from '../components/Inputs/BaseInput.vue'
export default {
  components: { BaseInput },
  name: 'Course',
  data () {
    return {
      course: {
        name: '',
        modalities: '',
        modules: null,
        workload: null
      },
      disciplines: [
        {
          name: '',
          workload: ''
        }
      ],
      modules: [
        {
          name
        }
      ],
      modalities: [
        { value: 'Modalidade 1', text: 'Modalidade 1' },
        { value: 'Modalidade 2', text: 'Modalidade 2' },
        { value: 'Modalidade 3', text: 'Modalidade 3' }
      ],

      fields: ['modulo', 'show_details'],
      items: [
        // { isActive: false, modulo: `Modulo 1` },
        //{ isActive: false, modulo: `Modulo 2` },
        //{ isActive: false, modulo: `Modulo 3` },
        //{ isActive: false, modulo: `Modulo 4` }
      ]
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      console.log(valid)
      return valid
    },
    addDiscipline () {
      this.disciplines.push({
        name: '',
        workload: ''
      })
    },
    addModule () {
      this.modules.push([name])
    }
  }
}
</script>
