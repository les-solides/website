<template>
	<div>
		<span class="block md:mt-32 mt-8 md:text-center w-full">Recommended products</span>
		
		<ul class="flex mt-4 overflow-x-auto">
			<ProductRecommended :product="recommendation"
								@click="$emit('click', recommendation)"
								short
								:key="recommendation.id"
								:class="{ 'mr-4': index < recommendations.length - 1 }"
								v-for="(recommendation, index) of recommendations"
								:mobile="mobile" />
		</ul>
	</div>
</template>

<script>
	import Product from "../../../modules/shopify/Product";
	import ProductRecommended from "../ProductRecommended";
	
	export default {
		name: "RecommendedProducts",
		components: {ProductRecommended},
		props: {
			mobile: {
				type: Boolean,
				default() {
					return false;
				}
			},
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