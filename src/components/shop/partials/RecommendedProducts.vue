<template>
	<div>
		<span class="block md:mt-32 mt-8 md:text-center w-full">Recommended products</span>
		
		<div class="flex mt-4">
			<ProductLink :product="recommendation"
						 short
						 :key="recommendation.id"
						 :class="{ 'mr-4': index < recommendations.length - 1 }"
						 v-for="(recommendation, index) of recommendations" />
		</div>
	</div>
</template>

<script>
	import Product from "../../../modules/shopify/Product";
	import ProductLink from "../ProductLink";
	
	export default {
		name: "RecommendedProducts",
		components: {ProductLink},
		props: {
			product: {
				type: Product,
				required: true
			}
		},
		data: () => ({
			recommendations: []
		}),
		async created() {
			this.recommendations = await this.$store.dispatch(
				"shopify/product/fetchRecommendations",
				this.product.id
			);
		}
	};
</script>

<style scoped>

</style>