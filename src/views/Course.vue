<template>
  <skeleton>
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
                placeholder=""
                v-model="modulesCount"
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

        <div v-if="checkFormValidity()">
          <h3 class="pt-3 pb-4">Disciplinas</h3>
          <div
            class="with-border rounded jumbotron jumbotron-fluid bg-white pt-2 pb-2"
            v-for="(Module, i) in course.modules"
            :key="i"
          >
            <div class="container">
              <b-row class="pt-3 pb-3 bb-2">
                <b-col> Módulo {{ i + 1 }} </b-col>
              </b-row>
              <b-card class="mb-2">
                <b-row
                  v-for="(discipline, j) in Module.disciplines"
                  :key="j"
                  class="mb-10 "
                >
                  <!-- NOME DA DISCIPLINA -->
                  <b-col lg="5" class="mb-10 ">
                    <base-input
                      type="text"
                      :label="'Disciplina ' + (j + 1)"
                      v-model="discipline.name"
                      placeholder=""
                      name="Disciplina"
                      required
                    >
                    </base-input>
                  </b-col>
                  <!-- CARGA HORÁRIA DA DISCIPLINA -->
                  <b-col lg="3">
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
                <b-row>
                  <b-col class="text-right" lg="8">
                    <button
                      @click="removeDiscipline(i)"
                      class="btn btn-outline-danger btn-sm rounded "
                    >
                      <i class="fa fa-minus "></i>
                    </button>
                    <button
                      @click="addDiscipline(i)"
                      class="btn btn-success btn-sm rounded "
                    >
                      <i class="fa fa-plus "></i>
                    </button>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </div>
          <b-row class="container" v-if="disabledAddModules">
            <button @click="addModule()" class="btn btn-success rounded  ">
              <i class="fa fa-plus "></i>
            </button>
          </b-row>
        </div>
      </b-card-body>
    </b-card>
  </skeleton>
</template>

<script>
export default {
  name: 'Course',
  data () {
    return {
      course: {
        name: '',
        modalities: '',
        modules: [
          {
            module: 1,
            disciplines: [
              {
                name: '',
                workload: null
              }
            ]
          }
        ],
        workload: null
      },
      modulesCount: null,
      modalities: [
        { value: 'Modalidade 1', text: 'Modalidade 1' },
        { value: 'Modalidade 2', text: 'Modalidade 2' },
        { value: 'Modalidade 3', text: 'Modalidade 3' }
      ]
    }
  },
  computed: {
    disabledAddModules () {
      const modules = this.course.modules
      if (modules.length < Number(this.modulesCount)) {
        return true
      }
      return false
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form && this.$refs.form.checkValidity()
      console.log(valid)
      return valid
    },

    addDiscipline (index) {
      console.log(index)
      this.course.modules[index].disciplines.push({
        name: '',
        workload: null
      })
    },

    removeDiscipline (index) {
      console.log(index)
      this.course.modules[index].disciplines.pop()
    },

    addModule () {
      const module = this.course.modules.length + 1
      this.course.modules.push({
        module,
        disciplines: [
          {
            name: '',
            workload: null
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.with-border {
  border: 1px solid #ced4da;
}
</style>
