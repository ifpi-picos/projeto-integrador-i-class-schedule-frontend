<template>
  <!-- <el-table
    class="table-responsive table"
    header-row-class-name="thead-light"
    :data="projects"
  >
    <el-table-column label="Professor" min-width="310px" prop="name">
      <template v-slot="{ row }">
        <b-media no-body class="align-items-center">
          <a href="#" class="avatar rounded-circle mr-3">
            <img alt="Image placeholder" :src="row.img" />
          </a>
          <b-media-body>
            <span class="font-weight-600 name mb-0 text-sm">{{
              row.title
            }}</span>
          </b-media-body>
        </b-media>
      </template>
    </el-table-column>
    <el-table-column label="Area de Atuação" prop="budget" min-width="180px">
    </el-table-column>

    <el-table-column label="Turmas" min-width="170px" prop="status">
      <template v-slot="{ row }">
        <badge class="badge-dot mr-4" type="">
          <i :class="`bg-${row.statusType}`"></i>
          <span class="status" :class="`text-${row.statusType}`">{{
            row.status
          }}</span>
        </badge>
      </template>
    </el-table-column>

    <el-table-column label="Disciplinas" min-width="150px">
      <div class="avatar-group">
        <a
          href="#"
          class="avatar avatar-sm rounded-circle"
          data-toggle="tooltip"
          data-original-title="Ryan Tompson"
        >
          <img alt="Image placeholder" src="img/theme/team-1.jpg" />
        </a>
      </div>
    </el-table-column>

    <el-table-column label="Ações" prop="completion" min-width="140px">
      <template v-slot="{ row }">
        <div class="d-flex align-items-center">
          <span class="completion mr-2">{{ row.completion }}%</span>
          <div>
            <base-progress :type="row.statusType" :value="row.completion" />
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table> -->
  <div>
    <el-table
      v-if="clas"
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="clas"
    >
      <el-table-column label="Turma" min-width="210px" prop="name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.nome
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Curso" prop="budget" min-width="180px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.curso
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Módulo" prop="budget" min-width="130px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.modulo
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Sala" min-width="130px" prop="status">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.local
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Turno" min-width="130px" prop="status">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.turno
              }}</span>
            </b-media-body>
          </b-media>         
        </template>
      </el-table-column>

      <el-table-column label="Horário" min-width="160px" prop="status">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.horario  
              }}</span>
            </b-media-body>
          </b-media>           
        </template>
      </el-table-column>


      <el-table-column label="Ações" min-width="130px">
        <template v-slot="{ row }">
          <div class="d-flex align-items-center">
            <b-button @click="editClas(row.id)" variant="outline-dark" size="sm"
              ><i class="fas fa-pen"></i
            ></b-button>

            <b-button
              @click="delClas(row.id, $event.target)"
              variant="outline-danger"
              size="sm"
              ><i class="fas fa-trash"></i
            ></b-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <class-form idModal="modalEdit" :idClas="clasId" />
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import ClassForm from "./ClassForm.vue";

export default {
  name: "ClassList",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    ClassForm,
  },

  data() {
    return {
      clasId: "",
      clas: "",
    };
  },
  created() {
    this.getClas();
  },
  methods: {
    async getClas() {
      await this.$firebase
        .database()
        .ref("turmas")
        .on("value", (data) => {
          let clas = data.val();
          const clasArray = Object.keys(clas).map((item) => clas[item]);
          console.log(clasArray);
          this.clas = clasArray;
        });
    },
    editClas(id, button) {
      this.clasId = id;
      //this.$refs.modaledit.show();
      this.$root.$emit("bv::show::modal", "modalEdit", button);
    },
    delClas(id) {
      const refFirebase = this.$firebase.database().ref("turmas");

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
