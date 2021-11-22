<template>
    <div>
        <div class="d-flex justify-content-center mt-3 mb-3" v-if="loading">
            <b-spinner
                style="width: 3rem; height: 3rem"
                variant="success"
                label="Spinning"
            ></b-spinner>
        </div>

        <div v-if="!loading">
            <b-table
                head-variant="light"
                hover
                responsive
                table-class="border-bottom"
                :items="subjects"
                :fields="fields"
                sort-by="nome"
                sort-icon-left
            >
                <template v-slot:cell(actions)="data">
                    <div class="d-flex align-items-center">
                        <b-button
                            @click="editsubject(data.item.id)"
                            variant="outline-dark"
                            size="sm"
                            ><i class="fas fa-pen"></i
                        ></b-button>

                        <b-button
                            @click="delsubject(data.item.id, $event.target)"
                            variant="outline-danger"
                            size="sm"
                            ><i class="fas fa-trash"></i
                        ></b-button>
                    </div>
                </template>
            </b-table>
        </div>
        <subject-form
            idModal="modalEdit"
            title="Editar Disciplina"
            :subjectId="subjectId"
        />
    </div>
</template>

<script>
import SubjectForm from '../components/SubjectForm'
export default {
	components: {
		SubjectForm
	},
	name: 'SubjectsList',
	data () {
		return {
			subjectId: '',
			subjects: [],
			fields: [
				{
					key: 'nome',
					label: 'Nome da discipina',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'carga_horaria',
					label: 'Carga Horária',
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
	created () {}
}
</script>

<style></style>
