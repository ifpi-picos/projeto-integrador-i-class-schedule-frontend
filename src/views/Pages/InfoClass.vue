<template>
	<div>
		<base-header
			class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
		></base-header>
		<b-container fluid class="mt--7">
			<b-card>
				<b-card-header
					v-if="classInfo"
					class="pt-0 pl-0 pr-0 d-flex justify-content-around"
				>
					<h3>CURSO: {{ classInfo.course.name }}</h3>
					<h4>Módulo/Série: {{ classInfo.modulo }}</h4>
					<h4>Sala: {{ classInfo.room.name }}</h4>
					<h4>Turno: {{ classInfo.shift.name }}</h4>
				</b-card-header>

				<b-card-body v-if="classInfo" class="p-0">
					<b-table
						table-class="border-bottom"
						head-variant="light"
						hover
						responsive
						sort-by="nome"
						sort-icon-left
						striped
						:fields="fields"
						:items="classInfo.subjects"
					></b-table>
				</b-card-body>

				<b-card-body v-else class="text-center">
					<b-spinner
						class="my-5"
						style="width: 3rem; height: 3rem"
						variant="success"
						label="Spinning"
					></b-spinner>
				</b-card-body>
			</b-card>
		</b-container>
	</div>
</template>

<script>
export default {
	name: 'infoClass',
	components: {},
	data() {
		return {
			classInfo: null,
			fields: [
				{
					key: 'name',
					label: 'Disciplina',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'workload',
					label: 'Carga Horária Total',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'weekWorkload',
					label: 'Carga Horária Semanal',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'teacher',
					label: 'Professor',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				}
			]
		}
	},
	created() {
		this.getinfoClass()
	},
	methods: {
		async getinfoClass() {
			const { id } = this.$route.params
			try {
				const { data } = await this.$axios.get(`/classes/${id}`)
				this.classInfo = data
			} catch ({ message }) {
				window.toast.fire({
					icon: 'error',
					title: message
				})
			}
		}
	}
}
</script>

<style></style>
