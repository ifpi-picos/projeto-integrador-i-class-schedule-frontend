<template>
	<section>
		<div v-if="loading" class="d-flex justify-content-center mt-3 mb-3">
			<b-spinner
				style="width: 3rem; height: 3rem"
				variant="success"
				label="Spinning"
			></b-spinner>
		</div>

		<div v-else>
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
				:items="dataBase"
				:fields="fields"
			>
				<template #cell(workload)="{ item }">
					{{ item.workload }}h
				</template>
				<template v-slot:cell(actions)="{ item }">
					<div class="d-flex justify-content-center">
						<b-button
							@click="editCourse(item)"
							variant="outline-dark"
							size="sm"
							><i class="fas fa-pen"></i
						></b-button>
						<b-button
							@click="delCourse(item.id)"
							variant="outline-danger"
							size="sm"
							><i class="fas fa-trash"></i
						></b-button>
					</div>
				</template>
				<template #empty>
					<h4>Sem dados</h4>
				</template>
			</b-table>
		</div>
	</section>
</template>

<script>
import handleData from '@/mixins/handleData.js'

export default {
	mixins: [handleData],

	data () {
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
		editCourse ({ id }) {
			this.$router.push({ path: '/cursos', query: { curso: id } })
		},

		async delCourse (id) {
			this.delete('/courses', id)
		}
	},

	created () {
		this.get('/courses')
	}
}
</script>

<style lang=""></style>
