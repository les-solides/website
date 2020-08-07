<template>
	<div class="flex flex-wrap justify-between">
		<ProductLink :product="product"
					 :key="product.id"
					 v-for="product of products" />
	</div>
</template>

<script>
	import ProductLink from "../shop/ProductLink";
	export default {
		name: "LinkProductGroup",
		components: {ProductLink},
		props: {
			products: {
				type: Array,
				required: true
			}
		}
	};
</script>

<style scoped>

</style>