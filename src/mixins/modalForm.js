import { eventBus } from '../main'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
	data() {
		return {
			registry: {},
			buttonDisable: false
		}
	},

	mounted() {
		this.$root.$on('bv::show::modal', (modalId, registry) => {
			if (modalId === 'modalEdit') {
				this.registry = Object.assign({}, registry)
			} else if (modalId === 'modalAdd') {
				this.registry = {}
			}
		})
	},

	methods: {
		// Validar formulário
		checkFormValidity() {
			const valid = this.$refs.form && this.$refs.form.checkValidity()
			return valid
		},

		async handleOk(url) {
			if (!this.checkFormValidity()) {
				return
			}
			const registry = this.registry

			// Verificar se foi pego um registro para editar
			if (registry.id) {
				try {
					const { data, message } = await this.$axios.put(
						`/${url}/${registry.id}`,
						registry
					)

					eventBus.$emit('update', data, 'modified')

					this.$refs[this.idModal].hide()

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
			} else {
				try {
					// adicionar um novo registro
					this.buttonDisable = true

					const { data, message } = await this.$axios.post(
						`/${url}`,
						registry
					)
					this.buttonDisable = false

					eventBus.$emit('update', data, 'added')

					this.$refs[this.idModal].hide()

					window.toast.fire({
						icon: 'success',
						title: message
					})
				} catch ({ message }) {
					this.buttonDisable = false

					window.toast.fire({
						icon: 'error',
						title: message
					})
				}
			}
		},
		cancel() {
			Swal.fire({
				title: 'Você têm certeza?',
				text: 'As alterações feitas podem não ser salvas.',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#2dce89',
				cancelButtonColor: '#f5365c',
				confirmButtonText: 'Confirmar',
				cancelButtonText: 'Cancelar'
			}).then(result => {
				if (result.isConfirmed) {
					this.$refs[this.idModal].hide()
				}
			})
		}
	},

	watch: {
		registry() {
			this.checkFormValidity()
		}
	}
}
