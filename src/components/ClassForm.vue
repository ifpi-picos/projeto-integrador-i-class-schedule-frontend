<template>
  <b-modal id="addclass" title="Título do modal" size="lg">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <h6 class="heading-small text-muted mb-4">Cadastro das turmas</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome da turma"
              placeholder="INFO III"
              v-model="clas.username"
              error="teste"
              rules="required"
              required
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="text"
              label="Curso"
              placeholder="Informática"
              v-model="clas.course"
              name="Curso"
              required
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input label="Local da aula">
              <select v-model="clas.location" class="form-control">
                <option>Local 1</option>
                <option>Local 2</option>
                <option>Local 3</option>
                <option>Local 4</option>
              </select>
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "ClassForm",
  data() {
    return {
      clas: {
        username: "",
      },
    };
  },
};
</script>