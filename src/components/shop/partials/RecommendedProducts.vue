<template>
	<div>
		<span class="block mb-3 md:text-center w-full">recommended products</span>
		
		<ul class="flex overflow-x-auto">
			<ProductLink
					:class="{
						'mr-4': true
					 }"
					:key="product.id"
					:product="product"
					v-for="product of products" />
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
				return [...this.$store.getters['shopify/product/allProducts'].filter(
					p => this.recommendations.find(r => r.src === p.src)
				)].sort(() => Math.random() - Math.random())
				  .slice(0, 10);
			}
		},
		async created() {
			// note: just ids returned
			this.recommendations = await this.$store.dispatch(
				"shopify/product/fetchRecommendations",
				this.product.id
			);
		},
		watch: {
			async product() {
				this.recommendations = await this.$store.dispatch(
					"shopify/product/fetchRecommendations",
					this.product.id
				);
			}
		}
	};
</script>

<style scoped>

</style>