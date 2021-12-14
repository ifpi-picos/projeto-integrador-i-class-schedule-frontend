<template>
	<div>
		<b-table
			sort-by="nome"
			sort-icon-left
			show-empty
			head-variant="light"
			hover
			responsive
			table-class="border-bottom"
			thead-tr-class="text-center"
			tbody-tr-class="text-center"
			:items="courses"
			:fields="fields"
		>
			<template #cell(workload)="{ item }">
				{{ item.workload }}h
			</template>
			<template v-slot:cell(actions)="data">
				<div class="d-flex justify-content-center">
					<b-button
						@click="editCourse(data.item)"
						variant="outline-dark"
						size="sm"
						><i class="fas fa-pen"></i
					></b-button>
					<b-button
						@click="delCourse(data.item.id)"
						variant="outline-danger"
						size="sm"
						><i class="fas fa-trash"></i
					></b-button>
				</div>
			</template>
		</b-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fields: [
				{
					key: 'name',
					label: 'Curso',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'workload',
					label: 'carga Horária',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'modules.length',
					label: 'Módulos',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'coordinationCourse.name',
					label: 'Coordenador',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'actions',
					label: 'Ações',
					thClass: 'text-center'
				}
			],
			courses: []
		}
	},

	methods: {
		async getCourse() {
			const { data } = await this.$axios.get('/courses')
			this.courses = data
		},

		editCourse({ id }) {
			this.$router.push({ path: '/cursos', query: { curso: id } })
		},

		async delCourse(id) {
			try {
				const { message } = await this.$axios.delete(`/courses/${id}`)
				const index = this.courses.findIndex(value => {
					return value.id === id
				})
				this.courses.splice(index, 1)

				window.toast.fire({
					icon: 'success',
					title: message
				})
			} catch ({ message }) {
				window.toast.fire({
					icon: 'error',
					title: message
				})
			}
		}
	},

	created() {
		this.getCourse()
	}
}
</script>

<style lang=""></style>
