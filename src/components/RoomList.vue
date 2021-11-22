<template>
    <div>
        <div v-if="loading" class="d-flex justify-content-center mt-3 mb-3">
            <b-spinner
                style="width: 3rem; height: 3rem"
                variant="success"
                label="Spinning"
            ></b-spinner>
        </div>
        <div v-else>
            <b-table
                head-variant="light"
                hover
                responsive
                table-class="border-bottom"
                thead-tr-class="text-center"
                tbody-tr-class="text-center"
                :items="dataBase"
                :fields="fields"
                sort-by="nome"
                sort-icon-left
                show-empty
            >
                <template v-slot:cell(actions)="data">
                    <div class="d-flex justify-content-center">
                        <b-button
                            @click="editRoom(data.item)"
                            variant="outline-dark"
                            size="sm"
                            ><i class="fas fa-pen"></i
                        ></b-button>

                        <b-button
                            @click="delRoom(data.item.id, $event.target)"
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

        <room-form idModal="modalEdit" title="Atualizar Sala" />
    </div>
</template>

<script>
import RoomForm from './RoomForm.vue'
import handleData from '../mixins/handleData.js'

export default {
	name: 'roomList',

	components: {
		RoomForm
	},

	mixins: [handleData],

	data () {
		return {
			fields: [
				{
					key: 'name',
					label: 'Sala',
					tdClass: 'font-weight-600 name text-sm ',
					sortable: true
				},
				{
					key: 'actions',
					label: 'Ações'
				}
			]
		}
	},

	created () {
		this.get('rooms')

		this.searchName = this.$debounce(query => {
			this.get('rooms', query)
		}, 1000)
	},

	methods: {
		editRoom (item) {
			this.$root.$emit('bv::show::modal', 'modalEdit', item)
		},
		delRoom (id) {
			this.delete('rooms', id)
		}
	},

	watch: {
		$route (to, from) {
			const query = to.query ? to.query : null
			this.searchName(query)
		}
	}
}
</script>

<style scoped></style>
