<template>
	<div>
		<base-header
			class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
		></base-header>
		<ClassForm idModal="addclass" title="Nova Turma" />
		<b-container fluid class="mt--7">
			<b-card>
				<b-card-header class="pt-0 pl-0 pr-0">
					<b-row align-h="between">
						<b-col>
							<h3>Turmas</h3>
						</b-col>
						<b-col class="text-right">
							<b-button variant="success" v-b-modal.addclass>
								<i class="ni ni-fat-add"></i>
								adicionar
							</b-button>
						</b-col>
					</b-row>
				</b-card-header>
				<b-card-body class="p-0">
					<ClassList />
				</b-card-body>
			</b-card>
		</b-container>
	</div>
</template>

<script>
import ClassForm from '@/components/ClassForm.vue'
import ClassList from '@/components/ClassList.vue'
export default {
	name: 'classPage',
	components: {
		ClassForm,
		ClassList
	},
	data () {
		return {}
	}
}
</script>

<style></style>
