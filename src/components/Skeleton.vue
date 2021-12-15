<template>
    <div>
        <base-header
            class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"
        ></base-header>

        <b-container fluid class="mt--7">
            <slot></slot>
        </b-container>
    </div>
</template>

<script>
export default {
	name: 'skeleton'
}
</script>

<style></style>
