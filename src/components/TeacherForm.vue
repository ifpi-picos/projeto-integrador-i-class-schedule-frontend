<template>
  <b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro de professores</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome"
              placeholder="Nome"
              name="Nome"
              v-model="teacher.username"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="text"
              label="Matrícula"
              placeholder="Ex.: SIAPE "
              v-model="teacher.registration"
              name="Matricula"
              required
              rules="required|min:7|max:7"
              maxlength="7"
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input
              type="email"
              label="E-mail"
              placeholder="professor@email.com"
              v-model="teacher.email"
              required
              name="email"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input label="Área de atuação" required>
              <b-form-select
                class="form-control"
                required
                v-model="teacher.occupationArea"
                :options="occupationAreas"
              ></b-form-select>
            </base-input>
          </b-col>

          <!--  <b-col lg="6">
            <base-input label="Coordenação" required>
              <b-form-select
                class="form-control"
                required
                v-model="teacher.coordination"
                :options="coordinations"
              ></b-form-select>
            </base-input>
          </b-col>-->
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
        @click="handleOk()"
      >
        Salvar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'TeacherForm',
  data () {
    return {
      teacher: {
        username: '',
        registration: '',
        email: '',
        occupationArea: null,
        coordination: null
      },
      coordinations: [
        { value: null, text: 'Por favor selecione uma opção' },
        { value: 'id-cordenação', text: 'ADS' },
        { value: 'id-cordenação', text: 'ADM' },
        { value: 'id-cordenação', text: 'FIS' }
      ],
      occupationAreas: [
        { value: null, text: 'Por favor selecione uma opção' },
        { value: 'informática', text: 'Infórmatica' },
        { value: 'fisica', text: 'Fisica' },
        { value: 'quimica', text: 'Quimica' }
      ]
    }
  },
  props: {
    idModal: {
      type: String,
      default: '',
      description: 'referencia do modal'
    },
    idTeacher: {
      type: String,
      default: '',
      description: 'id do professor que vai ser atualizado'
    },
    title: {
      type: String,
      description: 'titulo do modal'
    }
  }
}
</script>

<style></style>
