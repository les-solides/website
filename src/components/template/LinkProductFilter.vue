<template>
	<div class="flex flex-wrap justify-between"
		 v-if="ready">
		<ProductLink :product="product"
					 :key="product.id"
					 v-for="product of products" />
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
		async created() {
			this.products = await this.$store.dispatch(
				'shopify/collection/fetchByHandle',
				this.$route.params.collection
			);
			this.ready = true;
		}
	};
</script>