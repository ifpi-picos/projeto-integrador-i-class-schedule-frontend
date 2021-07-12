<template>
  <skeleton>
    <b-container fluid class="mt--7">
      <b-card>
        <b-card-header class="pt-0 pl-0 pr-0">
          <b-row align-h="between">
            <b-col>
              <h3>Cursos</h3>
            </b-col>
            <b-col class="text-right">
              <router-link class="btn btn-success" :to="{ name: 'novo-curso' }">
                <i class="ni ni-fat-add"></i>
                Adcionar</router-link
              >
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body class="p-0">
          <course-list />
        </b-card-body>
      </b-card>
    </b-container>
  </skeleton>
</template>

<script>
import CourseList from '@/components/CourseList.vue'

export default {
  name: 'Courses',
  components: {
    CourseList
  }
}
</script>

<style></style>
