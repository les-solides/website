<template>
	<div class="flex flex-wrap justify-between"
		 v-if="ready">
		<ProductLink :product="product"
					 :key="product.id"
					 v-for="product of filteredProducts" />
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import ProductLink from "../shop/ProductLink";
	
	export default {
		name: "LinkProductFilter",
		components: {ProductLink},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			products: [],
			ready: false
		}),
		computed: {
			filter() {
				return this.$route.params.filter;
			},
			filteredProducts() {
				return this.filter === 'all' ? this.products : this.products
					.filter(product => product.selectedVariant = product.variants.find(variant => variant.options.find(option => option.value === this.filter)));
			}
		},
		async created() {
			await this.$store.commit('updateLoading', true);
			this.products = await this.$store.dispatch(
				'shopify/collection/fetchByHandle',
				this.$route.params.collection
			);
			this.ready = true;
			await this.$store.commit('updateLoading', false);
		}
	};
</script>