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
              <h3>Disponibilidade</h3>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body class="p-0">
          <availability-form />
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import AvailabilityForm from '../components/AvailabilityForm.vue'
export default {
  components: { AvailabilityForm },
  name: 'Rooms'
}
</script>

<style></style>
