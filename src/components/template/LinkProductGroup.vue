<template>
	<div class="flex flex-wrap">
		<ProductLink :class="{
						'mr-4': (index % 2) - 1,
						'md:mr-4': (index % 10) - 9
					 }"
					 :product="product"
					 :key="product.id"
					 small
					 :with-price="false"
					 v-for="(product, index) of products" />
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