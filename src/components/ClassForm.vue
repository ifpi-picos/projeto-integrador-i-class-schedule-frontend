<template>
	<b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
		<b-form ref="form" @submit.stop.prevent="handleSubmit">
			<h6 class="heading-small text-muted mb-4">Cadastro das turmas</h6>

			<div class="px-lg-4">
				<b-row>
					<b-col lg="7">
						<base-input
							type="text"
							label="Nome da turma"
							placeholder="INFO III"
							v-model="registry.name"
							name="Nome da turma"
							required
						>
						</base-input>
					</b-col>

					<b-col lg="5">
						<base-input label="Turno" required>
							<b-form-select
								class="form-control"
								required
								v-model="registry.idShift"
								:options="shifts"
								value-field="id"
								text-field="name"
							></b-form-select>
						</base-input>
					</b-col>
				</b-row>

				<b-row>
					<b-col lg="6">
						<base-input label="Curso" name="Curso" required>
							<b-form-select
								class="form-control"
								required
								v-model="registry.idCourse"
								@change="getModules($event)"
								:options="courses"
								value-field="id"
								text-field="name"
							></b-form-select>
						</base-input>
					</b-col>

					<b-col lg="6">
						<base-input label="Módulo" required>
							<b-form-select
								class="form-control"
								required
								v-model="registry.idModule"
								:options="modules"
								value-field="id"
								text-field="number"
							></b-form-select>
						</base-input>
					</b-col>
				</b-row>

				<b-row>
					<b-col lg="6">
						<base-input label="Sala" required>
							<b-form-select
								class="form-control"
								required
								v-model="registry.idRoom"
								:options="rooms"
								value-field="id"
								text-field="name"
							></b-form-select>
						</base-input>
					</b-col>
					<b-col lg="6">
						<base-input
							type="text"
							label="Periodo Letivo"
							placeholder="2021.2"
							v-model="registry.schoolPeriod"
							name="Periodo"
							required
						>
						</base-input>
					</b-col>
				</b-row>
			</div>
		</b-form>

		<template #modal-footer>
			<b-button variant="outline-danger" @click="cancel">
				Cancelar
			</b-button>
			<b-button
				:disabled="!checkFormValidity()"
				variant="success"
				@click="handleOk('classes')"
			>
				Salvar
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import modalForm from '@/mixins/modalForm'

export default {
	name: 'classForm',

	mixins: [modalForm],

	props: {
		idModal: {
			type: String,
			default: '',
			description: 'referencia do modal'
		},
		idClass: {
			type: String,
			default: '',
			description: 'id da turma que vai ser atualizado'
		},
		title: {
			type: String,
			description: 'titulo do modal'
		}
	},

	data () {
		return {
			shifts: [],
			rooms: [],
			courses: [],
			modules: [],
		}
	},

	created () {
		this.getCourses()
		this.getRooms()
		this.getShifts()
	},

	methods: {
		async getCourses () {
			try {
				const { data } = await this.$axios.get('/courses')
				this.courses = data
                console.log(this.courses)
			} catch ({ message }) {
				window.toast.fire({
					icon: 'error',
					title: message
				})
			}
		},
		async getModules (courseId) {
			try {
				const { data } = await this.$axios.get(
					`/courses/${courseId}/modules`
				)
				this.modules = data
			} catch ({ message }) {
				window.toast.fire({
					icon: 'error',
					title: message
				})
			}
		},
		async getRooms () {
			try {
				const { data } = await this.$axios.get('/rooms')
				this.rooms = data
			} catch ({ message }) {
				window.toast.fire({
					icon: 'error',
					title: message
				})
			}
		},
		async getShifts () {
			try {
				const { data } = await this.$axios.get('/shifts')
				this.shifts = data
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
