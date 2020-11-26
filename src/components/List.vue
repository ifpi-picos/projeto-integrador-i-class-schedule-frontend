<template>
  <div>
    <el-table
      v-if="teachers"
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="teachers"
    >
      <slot name="collumn"></slot>

    </el-table>
    
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import TeacherForm from "./TeacherForm.vue";

export default {
  name: "list",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    TeacherForm,
  },

  data() {
    return {
      teacherId: "",
      teachers: "",
    };
  },
  created() {
    this.getTeachers();
  },
  methods: {
    async getTeachers() {
      await this.$firebase
        .database()
        .ref("professores")
        .on("value", (data) => {
          let teachers = data.val();
          const teacherArray = Object.keys(teachers).map(
            (item) => teachers[item]
          );
          console.log(teacherArray);
          this.teachers = teacherArray;
        });
    },
    editTeacher(id, button) {
      this.teacherId = id;
      //this.$refs.modaledit.show();
      this.$root.$emit("bv::show::modal", "modalEdit", button);
    },
    delTeacher(id) {
      const refFirebase = this.$firebase.database().ref("professores");

      this.$bvModal
        .msgBoxConfirm("Tem certeza que deseja deletar?", {
          title: "Confirmação",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          cancelVariant: "primary",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
          okTitle: "Sim",
          cancelTitle: "Não",
        })
        .then((value) => {
          if (value) {
            refFirebase.child(id).remove();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped></style>
