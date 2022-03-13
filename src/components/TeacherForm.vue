<template>
	<b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
		<b-form ref="form" @submit.stop.prevent="handleSubmit">
			<h6 class="heading-small text-muted mb-4">
				Cadastro de professores
			</h6>

			<div class="pl-lg-4">
				<b-row>
					<b-col lg="6">
						<base-input
							type="text"
							label="Nome"
							placeholder="Nome"
							name="Nome"
							v-model="registry.name"
							required
						>
						</base-input>
					</b-col>

					<b-col lg="6">
						<base-input
							type="text"
							label="Matrícula"
							placeholder="Ex.: SIAPE "
							v-model="registry.siape"
							name="Matricula"
							required
							rules="required|min:7|max:7"
							maxlength="7"
						>
						</base-input>
					</b-col>
				</b-row>

				<b-row>
					<b-col lg="6">
						<base-input
							type="email"
							label="E-mail"
							placeholder="professor@email.com"
							v-model="registry.email"
							required
							name="email"
						>
						</base-input>
					</b-col>
					<b-col lg="6">
						<base-input label="Área de atuação" required>
							<b-form-select
								class="form-control"
								required
								v-model="registry.idArea"
								:options="areas"
								value-field="id"
								text-field="name"
							></b-form-select>
						</base-input>
					</b-col>
				</b-row>
			</div>
		</b-form>
		<template #modal-footer>
			<!-- Emulate built in modal footer ok and cancel button actions -->
			<b-button variant="outline-danger" @click="cancel">
				Cancelar
			</b-button>
			<b-button
				:disabled="!checkFormValidity()"
				variant="success"
				@click="handleSubmit()"
			>
				Salvar
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import modalForm from '../mixins/modalForm'

export default {
	name: 'TeacherForm',
	mixins: [modalForm],
	data() {
		return {
			coordinations: [
				{ value: null, text: 'Por favor selecione uma opção' },
				{ value: 'id-cordenação', text: 'ADS' },
				{ value: 'id-cordenação', text: 'ADM' },
				{ value: 'id-cordenação', text: 'FIS' }
			],
			occupationAreas: []
		}
	},
	props: {
		idModal: {
			type: String,
			default: '',
			description: 'referencia do modal'
		},
		idTeacher: {
			type: String,
			default: '',
			description: 'id do professor que vai ser atualizado'
		},
		title: {
			type: String,
			description: 'titulo do modal'
		}
	},
	computed: {
		areas() {
			return this.$store.getters.getAreas
		}
	},
	methods: {
		handleSubmit() {
			this.handleOk('teachers')
		}
	}
}
</script>

<style></style>
