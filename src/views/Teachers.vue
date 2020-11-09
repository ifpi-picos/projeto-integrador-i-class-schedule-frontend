<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
    ></base-header>
    <TeacherForm ref="addteacher" />
    <b-container fluid class="mt--7">
      <b-card>
        <b-card-header class="pt-0 pl-0 pr-0">
          <b-row align-h="between">
            <b-col>
              <h3>Professores</h3>
            </b-col>
            <b-col class="text-right">
              <b-button variant="success" v-b-modal.addteacher>
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
    </b-container>
  </div>
</template>

<script>
import TeacherList from "@/components/TeacherList.vue";
import TeacherForm from "@/components/TeacherForm.vue";

export default {
  name: "Teachers",
  components: {
    TeacherForm,
    TeacherList,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
