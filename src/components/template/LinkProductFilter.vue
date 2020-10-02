<template>
	<div class="flex flex-wrap"
		 v-if="ready">
		<ProductLink :class="{
						'mr-4': (index % 2) - 1,
						'md:mr-4': (index % 5) - 4,
						'md:mr-0': (index % 5) - 5
					 }"
					 :product="product"
					 :key="_.uniqueId(product.id)"
					 v-for="(product, index) of filteredProducts" />
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