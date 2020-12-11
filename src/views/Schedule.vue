<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
    ></base-header>
    <schedule-form idModal="addSchedule" title="Novo Turno" />
    <b-container fluid class="mt--7">
      <b-card>
        <b-card-header class="pt-0 pl-0 pr-0">
          <b-row align-h="between">
            <b-col>
              <h3>Turnos</h3>
            </b-col>
            <b-col class="text-right">
              <b-button variant="success" v-b-modal.addSchedule>
                <i class="ni ni-fat-add"></i>
                Adcionar</b-button
              >
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body class="p-0">
          <schedule-list />
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import ScheduleList from '../components/ScheduleList'
import ScheduleForm from '../components/ScheduleForm'

export default {
  name: 'Schedules',
  components: {
    ScheduleList,
    ScheduleForm
  }
}
</script>

<style></style>
