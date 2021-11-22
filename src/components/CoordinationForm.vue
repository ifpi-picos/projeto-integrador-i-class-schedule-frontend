<template>
    <b-modal size="lg" centered :id="idModal" :ref="idModal" :title="title">
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <h6 class="heading-small text-muted mb-4">
                Cadastro das coordenações
            </h6>

            <div class="pl-lg-4">
                <b-row>
                    <b-col lg="11">
                        <base-input
                            type="text"
                            label="Nome da coordenação"
                            placeholder="Nome da coordenação"
                            name="Nome da coordenação"
                            v-model="registry.name"
                            required
                        >
                        </base-input>
                    </b-col>
                </b-row>
                <!-- <b-row>
          <b-col lg="11">
            <div class="form-group">
              <AutoComplete
                v-model="teacher"
                :options="teachers"
                label-key="name"
                value-key="id"
                placeholder="Nome do responsável"
                @shouldSearch="searchTeachers"
                @select="onSelect"
                required
              />
            </div>
          </b-col>
        </b-row> -->

                <b-row>
                    <b-col lg="11">
                        <label class="form-control-label">
                            Responsável
                            <span class="text-red">*</span>
                        </label>
                        <b-form-select
                            v-model="registry.idResponsible"
                            class="mb-3"
                        >
                            <b-form-select-option
                                v-if="registry.coordinationTeacher"
                                selected
                                :value="registry.coordinationTeacher.id"
                                >{{
                                    registry.coordinationTeacher.name
                                }}</b-form-select-option
                            >
                            <b-form-select-option
                                v-for="teacher in teachers"
                                :key="teacher.id"
                                :value="teacher.id"
                            >
                                {{ teacher.name }}
                            </b-form-select-option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="11">
                        <base-input
                            type="email"
                            label="Email da coordenação"
                            placeholder="coordenacao@ifpi.edu.br"
                            name="email"
                            v-model="registry.email"
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
                :disabled="!checkFormValidity()"
                variant="success"
                @click="createCoordination(registry.idResponsible)"
            >
                Salvar
                <!-- @click="handleOk()" -->
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import modalForm from '../mixins/modalForm'

export default {
	name: 'CoordinationForm',
	mixins: [modalForm],

	props: {
		idModal: {
			type: String,
			default: '',
			description: 'referencia do modal'
		},
		IdCoordination: {
			type: String,
			default: '',
			description: 'id da coordenação que vai ser atualizada'
		},
		title: {
			type: String,
			description: 'titulo do modal'
		}
	},

	data () {
		return {
			teachers: []
			// teacher: ''
		}
	},

	async created () {
		try {
			const { data } = await this.$axios.get(
				'/teachers/available-coordinators'
			)
			this.teachers = data
		} catch ({ message }) {
			console.log(message)
		}
	},
	methods: {
		createCoordination (id) {
			this.handleOk('coordinations')
			const teacherIndex = this.teachers.findIndex(teacher => {
				return teacher.id === id
			})
			this.teachers.splice(teacherIndex, 1)
		}
	},
	watch: {
		registry () {
			if (this.registry.coordinationTeacher) {
				this.registry.idResponsible = this.registry.coordinationTeacher.id
			}
		}
	}
}
</script>

<style lang=""></style>
