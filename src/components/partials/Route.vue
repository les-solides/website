<template>
	<router-link
			class="block"
			:to="to"
			:exact="exact">
		<slot></slot>
	</router-link>
</template>

<script>
	export default {
		name: "Route",
		props: {
			exact: {
				type: Boolean,
				default: () => true
			},
			to: {
				type: String,
				required: true
			}
		}
	};
</script>

<style scoped>
	.router-link-active {
		color: black !important;
		font-style: italic !important;
	}
	.text-gray-600 {
		color: #757575!important;
	}
</style>