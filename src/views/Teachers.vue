<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
    ></base-header>
    <b-container fluid class="mt--7">
      <b-card class="border-bottom-0">
        <b-card-header> Professores </b-card-header>

        <el-table
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
          <el-table-column
            label="Area de Atuação"
            prop="budget"
            min-width="180px"
          >
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

          <!--el-table-column label="Ações" prop="completion" min-width="140px">
            <template v-slot="{ row }">
              <div class="d-flex align-items-center">
                <span class="completion mr-2">{{ row.completion }}%</span>
                <div>
                  <base-progress
                    :type="row.statusType"
                    :value="row.completion"
                  />
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="Completion"
            prop="completion"
            min-width="240px"
          >
            <template v-slot="{ row }">
              <div class="d-flex align-items-center">
                <span class="completion mr-2">{{ row.completion }}%</span>
                <div>
                  <base-progress
                    :type="row.statusType"
                    :value="row.completion"
                  />
                </div>
              </div>
            </template>
          </el-table-column-->
        </el-table>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import projects from "./Tables/projects";

export default {
  name: "Teachers",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      projects,
    };
  },
};
</script>

<style></style>
