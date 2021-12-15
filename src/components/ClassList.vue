<template>
	<div>
		<div class="d-flex justify-content-center mt-3 mb-3" v-if="loading">
			<b-spinner
				style="width: 3rem; height: 3rem"
				variant="success"
				label="Spinning"
			></b-spinner>
		</div>
		<div v-else>
			<b-table
				table-class="border-bottom"
				head-variant="light"
				hover
				responsive
				:items="dataBase"
				:fields="fields"
				sort-by="nome"
				sort-icon-left
			>
				<template v-slot:cell(actions)="{ item }">
					<div class="d-flex align-items-center">
						<b-button
							@click="editClass(item)"
							variant="outline-dark"
							size="sm"
							><i class="fas fa-pen"></i
						></b-button>

						<b-button
							@click="delClass(item.id)"
							variant="outline-danger"
							size="sm"
						>
							<i class="fas fa-trash"></i>
						</b-button>
					</div>
				</template>
			</b-table>
		</div>
		<ClassForm idModal="modalEdit" :idClass="idClass" />
	</div>
</template>

<script>
import ClassForm from './ClassForm.vue'
import handleData from '../mixins/handleData.js'

export default {
	name: 'ClassList',
	components: {
		ClassForm
	},

	mixins: [handleData],

	data () {
		return {
			idClass: '',
			fields: [
				{
					key: 'name',
					label: 'Turma',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'classCourse.name',
					label: 'curso',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'modulo',
					label: 'Módulo',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'classRoom.name',
					label: 'sala',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'classShift.name',
					label: 'Horário',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'actions',
					label: 'Ações'
				}
			],
			loading: true
		}
	},

	created () {
		this.get('/classes')
	},

	methods: {
		editClass (item) {
			const payload = Object.assign({}, item)
			payload.idRoom = payload.classRoom.id
			payload.idCourse = payload.classCourse.id
			payload.idShift = payload.classShift.id

			delete payload.classRoom
			delete payload.classCourse
			delete payload.classShift

			this.$root.$emit('bv::show::modal', 'modalEdit', payload)
		},
		delClass (id) {
			this.delete('/classes', id)
		}
	}
}
</script>

<style scoped></style>
