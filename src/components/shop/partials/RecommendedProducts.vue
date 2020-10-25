<template>
	<div>
		<span class="block mb-3 md:text-center w-full">recommended products</span>
		
		<ul class="flex overflow-x-auto">
			<ProductLink
					:class="{
						'mr-4': (index % 2) - 1,
						'md:mr-4': (index % 5) - 4,
						'md:mr-0': (index % 5) - 5
					 }"
					:key="product.id"
					:product="product"
					v-for="(product, index) of recommendations" />
		</ul>
	</div>
</template>

<script>
	import Product from "../../../modules/shopify/Product";
	import ProductLink from "../ProductLink";
	
	export default {
		name: "RecommendedProducts",
		components: {ProductLink},
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
		computed: {
			products() {
				return this.$store.getters['shopify/product/allProducts'].filter(
					p => this.recommendations.find(r => r.id === p.id)
				);
			}
		},
		async created() {
			// note: just ids returned
			this.recommendations = await this.$store.dispatch(
				"shopify/product/fetchRecommendations",
				this.product.id
			);
		}
	};
</script>

<style scoped>

</style>