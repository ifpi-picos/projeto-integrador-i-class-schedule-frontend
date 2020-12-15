<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
    ></base-header>

    <b-container fluid class="mt--7">
      <b-card>
        <b-card-header class="pt-0 pl-0 pr-0">
          <b-row align-h="between">
            <b-col>
              <h3>Cursos</h3>
            </b-col>
            <b-col class="text-right">
              <b-button variant="success" href="CourseForm">
                <i class="ni ni-fat-add"></i>
                Adcionar</b-button
              >
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body class="p-0">
          <course-list />
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import CourseList from '@/components/CourseList.vue'
import CourseForm from './CourseForm.vue'

export default {
  name: 'Courses',
  components: {
    CourseList,
    CourseForm
  },
  data () {
    return {}
  }
}
</script>

<style></style>
