<template>
	<skeleton>
		<b-card>
			<b-card-header>
				<b-row align-h="between">
					<b-col>
						<h3>Cadastrar curso</h3>
					</b-col>
				</b-row>
			</b-card-header>

			<b-card-body>
				<b-form ref="form">
					<b-row>
						<b-col lg="6">
							<base-input
								type="text"
								label="Nome do curso"
								v-model="course.name"
								placeholder=""
								name="Nome do curso"
								required
							>
							</base-input>
						</b-col>
						<b-col lg="6">
							<base-input label="Coordenação">
								<b-form-select
									class="form-control"
									v-model="course.idCoordination"
									:options="coordinations"
									value-field="id"
									text-field="name"
								>
								</b-form-select>
							</base-input>
						</b-col>
					</b-row>

					<b-row>
						<b-col lg="4">
							<base-input label="Modalidade" required>
								<b-form-select
									class="form-control"
									required
									v-model="course.idLevel"
									:options="levels"
									value-field="id"
									text-field="name"
								>
								</b-form-select>
							</base-input>
						</b-col>

						<b-col lg="4">
							<base-input
								type="number"
								label="Módulos"
								min="1"
								v-model="modulesCount"
								name="Módulos"
								required
							>
							</base-input>
						</b-col>

						<b-col lg="4">
							<base-input
								type="number"
								label="Carga Horária"
								v-model="course.workload"
								min="1"
								name="Carga Horária"
								required
							>
							</base-input>
						</b-col>
					</b-row>
				</b-form>

				<div v-show="checkFormValidity()">
					<h3 class="pt-3 pb-4">Disciplinas</h3>
					<b-form ref="formSubjects">
						<div
							class="with-border rounded jumbotron jumbotron-fluid bg-white pt-2 pb-2"
							v-for="(module, i) in course.modules"
							:key="i"
						>
							<div class="container">
								<b-row class="pt-3 pb-3 bb-2">
									<b-col> Módulo {{ module.number }} </b-col>
								</b-row>
								<b-card class="mb-2">
									<b-row
										v-for="(discipline,
										j) in module.subjects"
										:key="j"
										class="mb-10 "
									>
										<!-- NOME DA DISCIPLINA -->
										<b-col lg="5" class="mb-10 ">
											<base-input
												type="text"
												:label="'Disciplina ' + (j + 1)"
												v-model="discipline.name"
												placeholder=""
												name="Disciplina"
												required
											>
											</base-input>
										</b-col>
										<!-- CARGA HORÁRIA DA DISCIPLINA -->
										<b-col lg="3">
											<base-input
												type="number"
												label="Carga Horária"
												v-model="discipline.workload"
												name="Carga Horária"
												min="1"
												required
											>
											</base-input>
										</b-col>
										<b-col lg="3">
											<base-input
												type="number"
												label="Carga Horária Semanal"
												v-model="discipline.weekWorkload"
												name="Carga Horária Semanal"
												min="1"
												required
											>
											</base-input>
										</b-col>
									</b-row>
									<b-row>
										<b-col class="text-right" lg="8">
											<button
												type="button"
												@click="removeDiscipline(i)"
												class="btn btn-outline-danger btn-sm rounded "
											>
												<i class="fa fa-minus "></i>
											</button>
											<button
												type="button"
												@click="addDiscipline(i)"
												class="btn btn-success btn-sm rounded "
											>
												<i class="fa fa-plus "></i>
											</button>
										</b-col>
									</b-row>
								</b-card>
							</div>
						</div>
					</b-form>
					<b-row class="container" v-if="disabledAddModules">
						<button
							@click="addModule()"
							class="btn btn-success rounded  "
						>
							<i class="fa fa-plus "></i>
						</button>
					</b-row>
				</div>
				<b-row align-h="center" class="pt-5 pb-3 text-center">
					<b-col xs="12" sm="4" lg="6">
						<b-button
							block
							@click="saveAll()"
							:disabled="!allFieldsFilled"
							variant="primary"
						>
							Salvar
						</b-button>
					</b-col>
				</b-row>
			</b-card-body>
		</b-card>
	</skeleton>
</template>

<script>
export default {
	name: 'coursePage',
	data () {
		return {
			course: {
				name: '',
				idLevel: '',
				modules: [
					{
						number: 1,
						subjects: [
							{
								name: '',
								workload: null,
								weekWorkload: null
							}
						]
					}
				],
				workload: null
			},
			modulesCount: null,
			levels: [],
			coordinations: [],
			allFieldsFilled: false
		}
	},

	created () {
		this.getCoordinations()
		this.getLeves()
	},

	methods: {
		checkFormValidity () {
			const valid = this.$refs.form && this.$refs.form.checkValidity()
			return valid
		},

		addDiscipline (index) {
			this.course.modules[index].subjects.push({
				name: '',
				workload: null,
				weekWorkload: null
			})
		},

		removeDiscipline (index) {
			if (this.course.modules[index].subjects.length > 1) {
				this.course.modules[index].subjects.pop()
			}
		},

		addModule () {
			const number = this.course.modules.length + 1
			this.course.modules.push({
				number,
				subjects: [
					{
						name: '',
						workload: null,
						weekWorkload: null
					}
				]
			})
		},

		async getCoordinations () {
			try {
				const { data } = await this.$axios.get('/coordinations')
				this.coordinations = data
			} catch ({ message }) {
				console.log(message)
			}
		},

		async getLeves () {
			try {
				const { data } = await this.$axios.get('/levels')
				this.levels = data
			} catch ({ message }) {
				console.log(message)
			}
		},

		async saveAll () {
			try {
				const { message } = await this.$axios.post(
					'/courses',
					this.course
				)

				window.toast.fire({
					icon: 'success',
					title: message
				})

				this.$router.push({ name: 'cursos' })
			} catch ({ message }) {
				window.toast.fire({
					icon: 'error',
					title: message
				})
			}
		}
	},

	computed: {
		disabledAddModules () {
			const modules = this.course.modules
			if (modules.length < Number(this.modulesCount)) {
				return true
			}

			return false
		}
	},

	watch: {
		course: {
			handler: function () {
				this.allFieldsFilled =
					this.$refs.formSubjects &&
					this.$refs.formSubjects.checkValidity() &&
					this.checkFormValidity()
			},
			deep: true
		}
	}
}
</script>

<style scoped>
.with-border {
	border: 1px solid #ced4da;
}
</style>
