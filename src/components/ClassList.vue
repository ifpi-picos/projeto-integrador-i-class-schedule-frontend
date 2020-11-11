<template>
  <div>
    <el-table-column
      label="Turmas"
      min-width="310px"
      prop="name"
    ></el-table-column>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import ClassForm from "./ClassForm.vue";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    ClassForm,
  },
};
</script>