<template>
  <div>
    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">Cadastro de professores</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome *"
              placeholder="Nome"
              v-model="user.username"
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="text"
              label="Matricula"
              placeholder="Ex.: SIAPE"
              v-model="user.registration"
            >
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input
              type="email"
              label="E-mail *"
              placeholder="professor@email.com"
              v-model="user.email"
            >
            </base-input>
          </b-col>
        </b-row>

        <!--hr class="my-4" />

        <h6 class="heading-small text-muted mb-4">
          Informações sobre o docente
        </h6-->

        <b-row>
          <b-col lg="6">
            <base-input label="Área de atuação *">
              <select v-model="user.occupationArea" class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </base-input>
          </b-col>

          <b-col lg="6">
            <base-input label="Cordenação" placeholder="">
              <select v-model="user.cordination" class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "TeacherForm",
  data() {
    return {
      user: {
        username: "Claudio",
        registration: "",
        email: "",
        occupationArea: "",
      },
    };
  },
};
</script>

<style></style>
