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
          <template>
            <b-form ref="form">
              <div>
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
                      v-model="course.module"
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
              </div>
            </b-form>
          </template>
          <h3 class="pt-3 pb-4">Disciplinas</h3>
          <b-table :items="items" :fields="fields" responsive="sm">
            <template #cell(show_details)="row">
              <b-button
                variant="success"
                size="sm"
                @click="row.toggleDetails"
                class="mr-2"
              >
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>

              <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @workloadange -->
              <b-form-workloadeckbox
                v-model="row.detailsShowing"
                @workloadange="row.toggleDetails"
              >
                Details via workloadeck
              </b-form-workloadeckbox>
            </template>

            <template #row-details="row">
              <b-card>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
                  <b-col>{{ row.item.age }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
                  <b-col>{{ row.item.isActive }}</b-col>
                </b-row>

                <b-button variant="success" size="sm" @click="row.toggleDetails"
                  >Hide Details</b-button
                >
              </b-card>
            </template>
          </b-table>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      course: {
        name: '',
        modalities: '',
        module: '',
        workload: ''
      },
      modalities: [
        { value: '', text: 'Modalidade 1' },
        { value: '', text: 'Modalidade 2' },
        { value: '', text: 'Modalidade 3' }
      ],

      fields: ['first_name', 'last_name', 'show_details'],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald'
        },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        {
          isActive: false,
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson',
          _showDetails: true
        },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>
