<template>
    <b-modal size="sm" centered :id="idModal" :ref="idModal" :title="title">
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <h6 class="heading-small text-muted mb-4">
                Cadastro de Area de atuação
            </h6>

            <div>
                <b-row>
                    <b-col lg="12">
                        <base-input
                            type="text"
                            name="Area"
                            label="Area"
                            placeholder="Area"
                            v-model.trim="registry.name"
                            required
                        >
                        </base-input>
                    </b-col>
                </b-row>
            </div>
        </b-form>
        <template #modal-footer="{ hide }">
            <b-button variant="outline-danger" @click="cancel">
                Cancelar
            </b-button>
            <b-button
                :disabled="!checkFormValidity() || buttonDisable"
                variant="success"
                @click="handleSubmit()"
            >
                <span v-if="buttonDisable">
                    <ButtonSpinner />
                </span>

                <span v-else>
                    Salvar
                </span>
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import modalForm from '../mixins/modalForm'

export default {
	name: 'AreaForm',
	mixins: [modalForm],
	data () {
		return {}
	},

	props: {
		idModal: {
			type: String,
			default: '',
			description: 'referencia do modal'
		},
		title: {
			type: String,
			description: 'titulo do modal'
		}
	},

	methods: {
		handleSubmit () {
			this.handleOk('areas')
		}
	}
}
</script>

<style scoped>
button > span {
    display: block;
    min-width: 50px;
}
</style>
