<template>
    <skeleton>
        <area-form idModal="modalAdd" title="Novo Área" />
        <b-card>
            <b-card-header class="pt-0 pl-0 pr-0">
                <b-row align-h="between">
                    <b-col>
                        <h3>Áreas</h3>
                    </b-col>
                    <b-col class="text-right">
                        <b-button variant="success" v-b-modal.modalAdd>
                            <i class="ni ni-fat-add"></i>
                            Adicionar</b-button
                        >
                    </b-col>
                </b-row>
            </b-card-header>
            <b-card-body class="p-0">
                <area-list />
            </b-card-body>
        </b-card>
    </skeleton>
</template>

<script>
import AreaForm from '@/components/AreaForm'
import AreaList from '@/components/AreaList'
export default {
	name: 'areasPage',
	components: {
		AreaForm,
		AreaList
	}
}
</script>

<style></style>
