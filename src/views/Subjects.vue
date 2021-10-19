<template>
  <skeleton>
    <subject-form idModal="modalAdd" title="Nova Disciplina" />
    <b-card>
      <b-card-header class="pt-0 pl-0 pr-0">
        <b-row align-h="between">
          <b-col>
            <h3>Disciplinas</h3>
          </b-col>
          <b-col class="text-right">
            <b-button variant="success" v-b-modal.modalAdd>
              <i class="ni ni-fat-add"></i>
              Adicionar</b-button
            >
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body class="p-0">
        <subject-list />
      </b-card-body>
    </b-card>
  </skeleton>
</template>

<script>
import SubjectList from '../components/SubjectList'
import SubjectForm from '../components/SubjectForm'

export default {
  name: 'Subjects',
  components: {
    SubjectList,
    SubjectForm
  }
}
</script>

<style></style>
