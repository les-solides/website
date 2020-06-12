<template>
	<router-link class="block" :to="to" exact>
		<slot></slot>
	</router-link>
</template>

<script>
	export default {
		name: "Route",
		props: {
			to: {
				type: String,
				required: true
			}
		}
	};
</script>

<style scoped>
	.router-link-active {
		font-style: italic;
	}
</style>