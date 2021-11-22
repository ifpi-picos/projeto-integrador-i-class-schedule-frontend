<template>
    <div>
        <b-table :items="items" :fields="fields" striped responsive="sm">
            <template #cell(Segunda)>
                <b-form-checkbox v-model="status" value="1"> </b-form-checkbox>
            </template>

            <template #cell(Terça)>
                <b-form-checkbox v-model="status" value="2"> </b-form-checkbox>
            </template>

            <template #cell(Quarta)>
                <b-form-checkbox v-model="status" value="3"> </b-form-checkbox>
            </template>

            <template #cell(Quinta)>
                <b-form-checkbox v-model="status" value="4"> </b-form-checkbox>
            </template>

            <template #cell(Sexta)>
                <b-form-checkbox v-model="status" value="5"> </b-form-checkbox>
            </template>
        </b-table>
        <div>
            <!-- State: <strong>{{ status }}</strong> -->
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			status: [],
			fields: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
			items: [{}]
		}
	}
}
</script>
<!--template>
  <div>
    <b-table striped hover :items="items">
      <b-form-group label-cols-lg="2">
        <b-form-checkbox v-model="striped" inline>Striped</b-form-checkbox>
        <b-form-checkbox v-model="bordered" inline>Bordered</b-form-checkbox>
        <b-form-checkbox v-model="borderless" inline
          >Borderless</b-form-checkbox
        >
        <b-form-checkbox v-model="outlined" inline>Outlined</b-form-checkbox>
        <b-form-checkbox v-model="small" inline>Small</b-form-checkbox>
        <b-form-checkbox v-model="hover" inline>Hover</b-form-checkbox>
        <b-form-checkbox v-model="dark" inline>Dark</b-form-checkbox>
        <b-form-checkbox v-model="fixed" inline>Fixed</b-form-checkbox>
      </b-form-group>
    </b-table>
  </div>
</template-->

<!-- <script>
export default {
  data () {
    return {
      items: [{ Segunda: '', Terça: '', Quarta: '', Quinta: '', Sexta: '' }],
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' }
      ]
    }
  }
}
</script> -->

<style lang="scss" scoped></style>
