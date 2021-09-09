<template>
  <skeleton>
    <teacher-form idModal="modalAdd" title="Novo Professor" />
    <b-card>
      <b-card-header class="pt-0 pl-0 pr-0">
        <b-row align-h="between">
          <b-col>
            <h3>Professores</h3>
          </b-col>
          <b-col class="text-right">
            <b-button variant="success" v-b-modal.modalAdd>
              <i class="ni ni-fat-add"></i>
              Adcionar</b-button
            >
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body class="p-0">
        <teacher-list />
      </b-card-body>
    </b-card>
  </skeleton>
</template>

<script>
import TeacherList from '@/components/TeacherList.vue'
import TeacherForm from '@/components/TeacherForm.vue'

export default {
  name: 'Teachers',
  components: {
    TeacherForm,
    TeacherList
  }
}
</script>

<style></style>
