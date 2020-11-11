<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
    ></base-header>
  </div>
</template>

<script>
import ClassForm from "@/components/ClassForm.vue";
import ClassList from "@/components/ClassList.vue";
export default {
  name: "Class",
  components: {
    ClassForm,
    ClassList,
  },
  data() {
    return {};
  },
};
</script>

<style></style>