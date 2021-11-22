<template>
    <skeleton>
        <schedule-form idModal="modalAdd" title="Novo Turno" />
        <b-card>
            <b-card-header class="pt-0 pl-0 pr-0">
                <b-row align-h="between">
                    <b-col>
                        <h3>Turnos</h3>
                    </b-col>
                    <b-col class="text-right">
                        <b-button variant="success" v-b-modal.modalAdd>
                            <i class="ni ni-fat-add"></i>
                            Adicionar</b-button
                        >
                    </b-col>
                </b-row>
            </b-card-header>
            <b-card-body class="p-0">
                <schedule-list />
            </b-card-body>
        </b-card>
    </skeleton>
</template>

<script>
import ScheduleList from '@/components/ScheduleList'
import ScheduleForm from '@/components/ScheduleForm'

export default {
	name: 'Schedules',
	components: {
		ScheduleList,
		ScheduleForm
	}
}
</script>

<style></style>
